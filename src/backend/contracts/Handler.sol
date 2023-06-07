//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./interfaces/IDeXcelFactory.sol";
import "./interfaces/IDeXcelRouter.sol";
import "./interfaces/IERC20.sol";

contract Handler {
    address public factory;
    address public router;

    constructor(address _factory, address _router) {
        factory = _factory;
        router = _router;
    }

    function addliquidity(
        address _token0,
        address _token1,
        uint256 _amount0,
        uint256 _amount1,
        address _to
    ) public returns (bool) {
        IERC20(_token0).approve(router, _amount0);
        IERC20(_token1).approve(router, _amount1);
        uint256 deadline = block.timestamp + 3600;
        IDeXcelRouter(router).addLiquidity(
            _token0,
            _token1,
            _amount0,
            _amount1,
            0,
            0,
            _to,
            deadline
        );
        return true;
    }

    function exchangeTokens(
        uint256 _amountIn,
        uint256 _amountOutMin,
        address[] calldata _path,
        address _to
    ) public returns (bool) {
        IERC20(_path[0]).approve(router, _amountIn);
        uint256 deadline = block.timestamp + 3600;
        IDeXcelRouter(router).swapExactTokensForTokens(
            _amountIn,
            _amountOutMin,
            _path,
            _to,
            deadline
        );
        return true;
    }

    function removeLiquiduty(
        address _tokenA,
        address _tokenB,
        uint _liquidity,
        uint _amountAMin,
        uint _amountBMin,
        address _to
    ) public returns (bool) {
        uint256 deadline = block.timestamp + 3600;
        IDeXcelRouter(router).removeLiquidity(
            _tokenA,
            _tokenB,
            _liquidity,
            _amountAMin,
            _amountBMin,
            _to,
            deadline
        );
        return true;
    }
}
