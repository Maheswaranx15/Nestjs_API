export const indigg721 = {
  "address": "0x4A4e26AaBaD728bb76478D3369b196561a0e5B77",
  "abi": [
    {
      "type": "constructor",
      "payable": false,
      "inputs": [
        { "type": "string", "name": "name" },
        { "type": "string", "name": "symbol" },
        { "type": "string", "name": "_baseTokenURI" }
      ]
    },
    {
      "type": "event",
      "anonymous": false,
      "name": "Approval",
      "inputs": [
        { "type": "address", "name": "owner", "indexed": true },
        { "type": "address", "name": "approved", "indexed": true },
        { "type": "uint256", "name": "tokenId", "indexed": true }
      ]
    },
    {
      "type": "event",
      "anonymous": false,
      "name": "ApprovalForAll",
      "inputs": [
        { "type": "address", "name": "owner", "indexed": true },
        { "type": "address", "name": "operator", "indexed": true },
        { "type": "bool", "name": "approved", "indexed": false }
      ]
    },
    {
      "type": "event",
      "anonymous": false,
      "name": "OwnershipTransferred",
      "inputs": [
        { "type": "address", "name": "previousOwner", "indexed": true },
        { "type": "address", "name": "newOwner", "indexed": true }
      ]
    },
    {
      "type": "event",
      "anonymous": false,
      "name": "RoleAdminChanged",
      "inputs": [
        { "type": "bytes32", "name": "role", "indexed": true },
        { "type": "bytes32", "name": "previousAdminRole", "indexed": true },
        { "type": "bytes32", "name": "newAdminRole", "indexed": true }
      ]
    },
    {
      "type": "event",
      "anonymous": false,
      "name": "RoleGranted",
      "inputs": [
        { "type": "bytes32", "name": "role", "indexed": true },
        { "type": "address", "name": "account", "indexed": true },
        { "type": "address", "name": "sender", "indexed": true }
      ]
    },
    {
      "type": "event",
      "anonymous": false,
      "name": "RoleRevoked",
      "inputs": [
        { "type": "bytes32", "name": "role", "indexed": true },
        { "type": "address", "name": "account", "indexed": true },
        { "type": "address", "name": "sender", "indexed": true }
      ]
    },
    {
      "type": "event",
      "anonymous": false,
      "name": "Transfer",
      "inputs": [
        { "type": "address", "name": "from", "indexed": true },
        { "type": "address", "name": "to", "indexed": true },
        { "type": "uint256", "name": "tokenId", "indexed": true }
      ]
    },
    {
      "type": "function",
      "name": "ADMIN_ROLE",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [],
      "outputs": [{ "type": "bytes32" }]
    },
    {
      "type": "function",
      "name": "DEFAULT_ADMIN_ROLE",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [],
      "outputs": [{ "type": "bytes32" }]
    },
    {
      "type": "function",
      "name": "approve",
      "constant": false,
      "payable": false,
      "inputs": [
        { "type": "address", "name": "to" },
        { "type": "uint256", "name": "tokenId" }
      ],
      "outputs": []
    },
    {
      "type": "function",
      "name": "balanceOf",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [{ "type": "address", "name": "owner" }],
      "outputs": [{ "type": "uint256" }]
    },
    {
      "type": "function",
      "name": "baseURI",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [],
      "outputs": [{ "type": "string" }]
    },
    {
      "type": "function",
      "name": "burn",
      "constant": false,
      "payable": false,
      "inputs": [{ "type": "uint256", "name": "tokenId" }],
      "outputs": []
    },
    {
      "type": "function",
      "name": "getApproved",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [{ "type": "uint256", "name": "tokenId" }],
      "outputs": [{ "type": "address" }]
    },
    {
      "type": "function",
      "name": "getRoleAdmin",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [{ "type": "bytes32", "name": "role" }],
      "outputs": [{ "type": "bytes32" }]
    },
    {
      "type": "function",
      "name": "grantRole",
      "constant": false,
      "payable": false,
      "inputs": [
        { "type": "bytes32", "name": "role" },
        { "type": "address", "name": "account" }
      ],
      "outputs": []
    },
    {
      "type": "function",
      "name": "hasRole",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [
        { "type": "bytes32", "name": "role" },
        { "type": "address", "name": "account" }
      ],
      "outputs": [{ "type": "bool" }]
    },
    {
      "type": "function",
      "name": "isApprovedForAll",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [
        { "type": "address", "name": "owner" },
        { "type": "address", "name": "operator" }
      ],
      "outputs": [{ "type": "bool" }]
    },
    {
      "type": "function",
      "name": "mint",
      "constant": false,
      "payable": false,
      "inputs": [
        { "type": "string", "name": "_tokenURI" },
        { "type": "uint96", "name": "_royaltyFee" }
      ],
      "outputs": [{ "type": "uint256", "name": "_tokenId" }]
    },
    {
      "type": "function",
      "name": "name",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [],
      "outputs": [{ "type": "string" }]
    },
    {
      "type": "function",
      "name": "operator",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [],
      "outputs": [{ "type": "address" }]
    },
    {
      "type": "function",
      "name": "owner",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [],
      "outputs": [{ "type": "address" }]
    },
    {
      "type": "function",
      "name": "ownerOf",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [{ "type": "uint256", "name": "tokenId" }],
      "outputs": [{ "type": "address" }]
    },
    {
      "type": "function",
      "name": "renounceRole",
      "constant": false,
      "payable": false,
      "inputs": [
        { "type": "bytes32", "name": "role" },
        { "type": "address", "name": "account" }
      ],
      "outputs": []
    },
    {
      "type": "function",
      "name": "revokeRole",
      "constant": false,
      "payable": false,
      "inputs": [
        { "type": "bytes32", "name": "role" },
        { "type": "address", "name": "account" }
      ],
      "outputs": []
    },
    {
      "type": "function",
      "name": "royaltyInfo",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [
        { "type": "uint256", "name": "_tokenId" },
        { "type": "uint256", "name": "_salePrice" }
      ],
      "outputs": [{ "type": "address" }, { "type": "uint256" }]
    },
    {
      "type": "function",
      "name": "safeTransferFrom",
      "constant": false,
      "payable": false,
      "inputs": [
        { "type": "address", "name": "from" },
        { "type": "address", "name": "to" },
        { "type": "uint256", "name": "tokenId" }
      ],
      "outputs": []
    },
    {
      "type": "function",
      "name": "safeTransferFrom",
      "constant": false,
      "payable": false,
      "inputs": [
        { "type": "address", "name": "from" },
        { "type": "address", "name": "to" },
        { "type": "uint256", "name": "tokenId" },
        { "type": "bytes", "name": "data" }
      ],
      "outputs": []
    },
    {
      "type": "function",
      "name": "setApprovalForAll",
      "constant": false,
      "payable": false,
      "inputs": [
        { "type": "address", "name": "operator" },
        { "type": "bool", "name": "approved" }
      ],
      "outputs": []
    },
    {
      "type": "function",
      "name": "setBaseURI",
      "constant": false,
      "payable": false,
      "inputs": [{ "type": "string", "name": "_baseTokenURI" }],
      "outputs": []
    },
    {
      "type": "function",
      "name": "supportsInterface",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [{ "type": "bytes4", "name": "interfaceId" }],
      "outputs": [{ "type": "bool" }]
    },
    {
      "type": "function",
      "name": "symbol",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [],
      "outputs": [{ "type": "string" }]
    },
    {
      "type": "function",
      "name": "tokenByIndex",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [{ "type": "uint256", "name": "index" }],
      "outputs": [{ "type": "uint256" }]
    },
    {
      "type": "function",
      "name": "tokenOfOwnerByIndex",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [
        { "type": "address", "name": "owner" },
        { "type": "uint256", "name": "index" }
      ],
      "outputs": [{ "type": "uint256" }]
    },
    {
      "type": "function",
      "name": "tokenURI",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [{ "type": "uint256", "name": "tokenId" }],
      "outputs": [{ "type": "string" }]
    },
    {
      "type": "function",
      "name": "totalSupply",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [],
      "outputs": [{ "type": "uint256" }]
    },
    {
      "type": "function",
      "name": "transferFrom",
      "constant": false,
      "payable": false,
      "inputs": [
        { "type": "address", "name": "from" },
        { "type": "address", "name": "to" },
        { "type": "uint256", "name": "tokenId" }
      ],
      "outputs": []
    },
    {
      "type": "function",
      "name": "transferOwnership",
      "constant": false,
      "payable": false,
      "inputs": [{ "type": "address", "name": "newOwner" }],
      "outputs": [{ "type": "bool" }]
    }
  ]
}
