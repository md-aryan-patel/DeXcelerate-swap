// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IDeXcelRouter.sol";
import "./Utils/SafeMath.sol";
import "./Utils/DeXcelLibrary.sol";
import "./interfaces/IDeXcelFactory.sol";
import "./Utils/TransferHelper.sol";
import "./DeXcelPair.sol";

contract DeXcelRouter is IDeXcelRouter {
    using SafeMath for uint;

    address public immutable override factory;
    address public immutable override WETH;

    constructor(address _factory, address _WETH) {
        factory = _factory;
        WETH = _WETH;
    }

    receive() external payable {
        assert(msg.sender == WETH); // only accept ETH via fallback from the WETH contract
    }

    // **** ADD LIQUIDITY ****
    function _addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin
    ) internal virtual returns (uint amountA, uint amountB) {
        // create the pair if it doesn't exist yet
        if (IDeXcelFactory(factory).getPair(tokenA, tokenB) == address(0)) {
            IDeXcelFactory(factory).createPair(tokenA, tokenB);
        }
        (uint reserveA, uint reserveB) = DeXcelLibrary.getReserves(
            factory,
            tokenA,
            tokenB
        );
        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
        } else {
            uint amountBOptimal = DeXcelLibrary.quote(
                amountADesired,
                reserveA,
                reserveB
            );
            if (amountBOptimal <= amountBDesired) {
                require(
                    amountBOptimal >= amountBMin,
                    "DeXcelRouter: INSUFFICIENT_B_AMOUNT"
                );
                (amountA, amountB) = (amountADesired, amountBOptimal);
            } else {
                uint amountAOptimal = DeXcelLibrary.quote(
                    amountBDesired,
                    reserveB,
                    reserveA
                );
                assert(amountAOptimal <= amountADesired);
                require(
                    amountAOptimal >= amountAMin,
                    "DeXcelRouter: INSUFFICIENT_A_AMOUNT"
                );
                (amountA, amountB) = (amountAOptimal, amountBDesired);
            }
        }
    }

    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    )
        external
        virtual
        override
        returns (uint amountA, uint amountB, uint liquidity)
    {
        (amountA, amountB) = _addLiquidity(
            tokenA,
            tokenB,
            amountADesired,
            amountBDesired,
            amountAMin,
            amountBMin
        );
        address pair = DeXcelLibrary.pairFor(factory, tokenA, tokenB);
        TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);
        TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);
        liquidity = IDeXcelPair(pair).mint(to);
    }

    // **** REMOVE LIQUIDITY ****
    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) public virtual override returns (uint amountA, uint amountB) {
        address pair = DeXcelLibrary.pairFor(factory, tokenA, tokenB);
        DeXcelPair(pair).transferFrom(msg.sender, pair, liquidity); // send liquidity to pair
        (uint amount0, uint amount1) = IDeXcelPair(pair).burn(to);
        (address token0, ) = DeXcelLibrary.sortTokens(tokenA, tokenB);
        (amountA, amountB) = tokenA == token0
            ? (amount0, amount1)
            : (amount1, amount0);
        require(amountA >= amountAMin, "DeXcelRouter: INSUFFICIENT_A_AMOUNT");
        require(amountB >= amountBMin, "DeXcelRouter: INSUFFICIENT_B_AMOUNT");
    }

    // **** SWAP ****
    // requires the initial amount to have already been sent to the first pair
    function _swap(
        uint[] memory amounts,
        address[] memory path,
        address _to
    ) internal virtual {
        for (uint i; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i + 1]);
            (address token0, ) = DeXcelLibrary.sortTokens(input, output);
            uint amountOut = amounts[i + 1];
            (uint amount0Out, uint amount1Out) = input == token0
                ? (uint(0), amountOut)
                : (amountOut, uint(0));
            address to = i < path.length - 2
                ? DeXcelLibrary.pairFor(factory, output, path[i + 2])
                : _to;
            IDeXcelPair(DeXcelLibrary.pairFor(factory, input, output)).swap(
                amount0Out,
                amount1Out,
                to,
                new bytes(0)
            );
        }
    }

    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external virtual override returns (uint[] memory amounts) {
        amounts = DeXcelLibrary.getAmountsOut(factory, amountIn, path);
        require(
            amounts[amounts.length - 1] >= amountOutMin,
            "DeXcelRouter: INSUFFICIENT_OUTPUT_AMOUNT"
        );
        TransferHelper.safeTransferFrom(
            path[0],
            msg.sender,
            DeXcelLibrary.pairFor(factory, path[0], path[1]),
            amounts[0]
        );
        _swap(amounts, path, to);
    }
}
