# LongNecksEthVault

> LongNecks Etheureum Vault

## Methods

### DEFAULT_PAYLOAD_SIZE_LIMIT

```solidity
function DEFAULT_PAYLOAD_SIZE_LIMIT() external view returns (uint256)
```

#### Returns

| Name | Type    | Description |
| ---- | ------- | ----------- |
| \_0  | uint256 | undefined   |

### ETH_CHAIN_ID

```solidity
function ETH_CHAIN_ID() external view returns (uint16)
```

#### Returns

| Name | Type   | Description |
| ---- | ------ | ----------- |
| \_0  | uint16 | undefined   |

### FUNCTION_TYPE_SEND

```solidity
function FUNCTION_TYPE_SEND() external view returns (uint16)
```

#### Returns

| Name | Type   | Description |
| ---- | ------ | ----------- |
| \_0  | uint16 | undefined   |

### LongNecksNFT

```solidity
function LongNecksNFT() external view returns (contract IERC721)
```

#### Returns

| Name | Type             | Description |
| ---- | ---------------- | ----------- |
| \_0  | contract IERC721 | undefined   |

### clearCredits

```solidity
function clearCredits(bytes _payload) external nonpayable
```

#### Parameters

| Name      | Type  | Description |
| --------- | ----- | ----------- |
| \_payload | bytes | undefined   |

### dstChainIdToBatchLimit

```solidity
function dstChainIdToBatchLimit(uint16) external view returns (uint256)
```

#### Parameters

| Name | Type   | Description |
| ---- | ------ | ----------- |
| \_0  | uint16 | undefined   |

#### Returns

| Name | Type    | Description |
| ---- | ------- | ----------- |
| \_0  | uint256 | undefined   |

### dstChainIdToTransferGas

```solidity
function dstChainIdToTransferGas(uint16) external view returns (uint256)
```

#### Parameters

| Name | Type   | Description |
| ---- | ------ | ----------- |
| \_0  | uint16 | undefined   |

#### Returns

| Name | Type    | Description |
| ---- | ------- | ----------- |
| \_0  | uint256 | undefined   |

### estimateSendBatchFee

```solidity
function estimateSendBatchFee(uint16 _dstChainId, bytes _toAddress, uint256[] _tokenIds, bool _useZro, bytes _adapterParams) external view returns (uint256 nativeFee, uint256 zroFee)
```

#### Parameters

| Name            | Type      | Description |
| --------------- | --------- | ----------- |
| \_dstChainId    | uint16    | undefined   |
| \_toAddress     | bytes     | undefined   |
| \_tokenIds      | uint256[] | undefined   |
| \_useZro        | bool      | undefined   |
| \_adapterParams | bytes     | undefined   |

#### Returns

| Name      | Type    | Description |
| --------- | ------- | ----------- |
| nativeFee | uint256 | undefined   |
| zroFee    | uint256 | undefined   |

### estimateSendFee

```solidity
function estimateSendFee(uint16 _dstChainId, bytes _toAddress, uint256 _tokenId, bool _useZro, bytes _adapterParams) external view returns (uint256 nativeFee, uint256 zroFee)
```

#### Parameters

| Name            | Type    | Description |
| --------------- | ------- | ----------- |
| \_dstChainId    | uint16  | undefined   |
| \_toAddress     | bytes   | undefined   |
| \_tokenId       | uint256 | undefined   |
| \_useZro        | bool    | undefined   |
| \_adapterParams | bytes   | undefined   |

#### Returns

| Name      | Type    | Description |
| --------- | ------- | ----------- |
| nativeFee | uint256 | undefined   |
| zroFee    | uint256 | undefined   |

### failedMessages

```solidity
function failedMessages(uint16, bytes, uint64) external view returns (bytes32)
```

#### Parameters

| Name | Type   | Description |
| ---- | ------ | ----------- |
| \_0  | uint16 | undefined   |
| \_1  | bytes  | undefined   |
| \_2  | uint64 | undefined   |

#### Returns

| Name | Type    | Description |
| ---- | ------- | ----------- |
| \_0  | bytes32 | undefined   |

### forceResumeReceive

```solidity
function forceResumeReceive(uint16 _srcChainId, bytes _srcAddress) external nonpayable
```

#### Parameters

| Name         | Type   | Description |
| ------------ | ------ | ----------- |
| \_srcChainId | uint16 | undefined   |
| \_srcAddress | bytes  | undefined   |

### getConfig

```solidity
function getConfig(uint16 _version, uint16 _chainId, address, uint256 _configType) external view returns (bytes)
```

#### Parameters

| Name         | Type    | Description |
| ------------ | ------- | ----------- |
| \_version    | uint16  | undefined   |
| \_chainId    | uint16  | undefined   |
| \_2          | address | undefined   |
| \_configType | uint256 | undefined   |

#### Returns

| Name | Type  | Description |
| ---- | ----- | ----------- |
| \_0  | bytes | undefined   |

### getTrustedRemoteAddress

```solidity
function getTrustedRemoteAddress(uint16 _remoteChainId) external view returns (bytes)
```

#### Parameters

| Name            | Type   | Description |
| --------------- | ------ | ----------- |
| \_remoteChainId | uint16 | undefined   |

#### Returns

| Name | Type  | Description |
| ---- | ----- | ----------- |
| \_0  | bytes | undefined   |

### isTrustedRemote

```solidity
function isTrustedRemote(uint16 _srcChainId, bytes _srcAddress) external view returns (bool)
```

#### Parameters

| Name         | Type   | Description |
| ------------ | ------ | ----------- |
| \_srcChainId | uint16 | undefined   |
| \_srcAddress | bytes  | undefined   |

#### Returns

| Name | Type | Description |
| ---- | ---- | ----------- |
| \_0  | bool | undefined   |

### lzEndpoint

```solidity
function lzEndpoint() external view returns (contract ILayerZeroEndpoint)
```

#### Returns

| Name | Type                        | Description |
| ---- | --------------------------- | ----------- |
| \_0  | contract ILayerZeroEndpoint | undefined   |

### lzReceive

```solidity
function lzReceive(uint16 _srcChainId, bytes _srcAddress, uint64 _nonce, bytes _payload) external nonpayable
```

#### Parameters

| Name         | Type   | Description |
| ------------ | ------ | ----------- |
| \_srcChainId | uint16 | undefined   |
| \_srcAddress | bytes  | undefined   |
| \_nonce      | uint64 | undefined   |
| \_payload    | bytes  | undefined   |

### minDstGasLookup

```solidity
function minDstGasLookup(uint16, uint16) external view returns (uint256)
```

#### Parameters

| Name | Type   | Description |
| ---- | ------ | ----------- |
| \_0  | uint16 | undefined   |
| \_1  | uint16 | undefined   |

#### Returns

| Name | Type    | Description |
| ---- | ------- | ----------- |
| \_0  | uint256 | undefined   |

### minGasToTransferAndStore

```solidity
function minGasToTransferAndStore() external view returns (uint256)
```

#### Returns

| Name | Type    | Description |
| ---- | ------- | ----------- |
| \_0  | uint256 | undefined   |

### nonblockingLzReceive

```solidity
function nonblockingLzReceive(uint16 _srcChainId, bytes _srcAddress, uint64 _nonce, bytes _payload) external nonpayable
```

#### Parameters

| Name         | Type   | Description |
| ------------ | ------ | ----------- |
| \_srcChainId | uint16 | undefined   |
| \_srcAddress | bytes  | undefined   |
| \_nonce      | uint64 | undefined   |
| \_payload    | bytes  | undefined   |

### onERC721Received

```solidity
function onERC721Received(address, address, uint256, bytes) external pure returns (bytes4)
```

#### Parameters

| Name | Type    | Description |
| ---- | ------- | ----------- |
| \_0  | address | undefined   |
| \_1  | address | undefined   |
| \_2  | uint256 | undefined   |
| \_3  | bytes   | undefined   |

#### Returns

| Name | Type   | Description |
| ---- | ------ | ----------- |
| \_0  | bytes4 | undefined   |

### owner

```solidity
function owner() external view returns (address)
```

_Returns the address of the current owner._

#### Returns

| Name | Type    | Description |
| ---- | ------- | ----------- |
| \_0  | address | undefined   |

### payloadSizeLimitLookup

```solidity
function payloadSizeLimitLookup(uint16) external view returns (uint256)
```

#### Parameters

| Name | Type   | Description |
| ---- | ------ | ----------- |
| \_0  | uint16 | undefined   |

#### Returns

| Name | Type    | Description |
| ---- | ------- | ----------- |
| \_0  | uint256 | undefined   |

### precrime

```solidity
function precrime() external view returns (address)
```

#### Returns

| Name | Type    | Description |
| ---- | ------- | ----------- |
| \_0  | address | undefined   |

### renounceOwnership

```solidity
function renounceOwnership() external nonpayable
```

_Leaves the contract without owner. It will not be possible to call `onlyOwner` functions. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby disabling any functionality that is only available to the owner._

### retryMessage

```solidity
function retryMessage(uint16 _srcChainId, bytes _srcAddress, uint64 _nonce, bytes _payload) external payable
```

#### Parameters

| Name         | Type   | Description |
| ------------ | ------ | ----------- |
| \_srcChainId | uint16 | undefined   |
| \_srcAddress | bytes  | undefined   |
| \_nonce      | uint64 | undefined   |
| \_payload    | bytes  | undefined   |

### sendBatchToEth

```solidity
function sendBatchToEth(address _toAddress, uint256[] _tokenIds, address payable _refundAddress, address _zroPaymentAddress, bytes _adapterParams) external payable
```

#### Parameters

| Name                | Type            | Description |
| ------------------- | --------------- | ----------- |
| \_toAddress         | address         | undefined   |
| \_tokenIds          | uint256[]       | undefined   |
| \_refundAddress     | address payable | undefined   |
| \_zroPaymentAddress | address         | undefined   |
| \_adapterParams     | bytes           | undefined   |

### sendToEth

```solidity
function sendToEth(address _toAddress, uint256 _tokenId, address payable _refundAddress, address _zroPaymentAddress, bytes _adapterParams) external payable
```

#### Parameters

| Name                | Type            | Description |
| ------------------- | --------------- | ----------- |
| \_toAddress         | address         | undefined   |
| \_tokenId           | uint256         | undefined   |
| \_refundAddress     | address payable | undefined   |
| \_zroPaymentAddress | address         | undefined   |
| \_adapterParams     | bytes           | undefined   |

### setConfig

```solidity
function setConfig(uint16 _version, uint16 _chainId, uint256 _configType, bytes _config) external nonpayable
```

#### Parameters

| Name         | Type    | Description |
| ------------ | ------- | ----------- |
| \_version    | uint16  | undefined   |
| \_chainId    | uint16  | undefined   |
| \_configType | uint256 | undefined   |
| \_config     | bytes   | undefined   |

### setDstChainIdToBatchLimit

```solidity
function setDstChainIdToBatchLimit(uint16 _dstChainId, uint256 _dstChainIdToBatchLimit) external nonpayable
```

#### Parameters

| Name                     | Type    | Description |
| ------------------------ | ------- | ----------- |
| \_dstChainId             | uint16  | undefined   |
| \_dstChainIdToBatchLimit | uint256 | undefined   |

### setDstChainIdToTransferGas

```solidity
function setDstChainIdToTransferGas(uint16 _dstChainId, uint256 _dstChainIdToTransferGas) external nonpayable
```

#### Parameters

| Name                      | Type    | Description |
| ------------------------- | ------- | ----------- |
| \_dstChainId              | uint16  | undefined   |
| \_dstChainIdToTransferGas | uint256 | undefined   |

### setMinDstGas

```solidity
function setMinDstGas(uint16 _dstChainId, uint16 _packetType, uint256 _minGas) external nonpayable
```

#### Parameters

| Name         | Type    | Description |
| ------------ | ------- | ----------- |
| \_dstChainId | uint16  | undefined   |
| \_packetType | uint16  | undefined   |
| \_minGas     | uint256 | undefined   |

### setMinGasToTransferAndStore

```solidity
function setMinGasToTransferAndStore(uint256 _minGasToTransferAndStore) external nonpayable
```

#### Parameters

| Name                       | Type    | Description |
| -------------------------- | ------- | ----------- |
| \_minGasToTransferAndStore | uint256 | undefined   |

### setPayloadSizeLimit

```solidity
function setPayloadSizeLimit(uint16 _dstChainId, uint256 _size) external nonpayable
```

#### Parameters

| Name         | Type    | Description |
| ------------ | ------- | ----------- |
| \_dstChainId | uint16  | undefined   |
| \_size       | uint256 | undefined   |

### setPrecrime

```solidity
function setPrecrime(address _precrime) external nonpayable
```

#### Parameters

| Name       | Type    | Description |
| ---------- | ------- | ----------- |
| \_precrime | address | undefined   |

### setReceiveVersion

```solidity
function setReceiveVersion(uint16 _version) external nonpayable
```

#### Parameters

| Name      | Type   | Description |
| --------- | ------ | ----------- |
| \_version | uint16 | undefined   |

### setSendVersion

```solidity
function setSendVersion(uint16 _version) external nonpayable
```

#### Parameters

| Name      | Type   | Description |
| --------- | ------ | ----------- |
| \_version | uint16 | undefined   |

### setTrustedRemote

```solidity
function setTrustedRemote(uint16 _remoteChainId, bytes _path) external nonpayable
```

#### Parameters

| Name            | Type   | Description |
| --------------- | ------ | ----------- |
| \_remoteChainId | uint16 | undefined   |
| \_path          | bytes  | undefined   |

### setTrustedRemoteAddress

```solidity
function setTrustedRemoteAddress(uint16 _remoteChainId, bytes _remoteAddress) external nonpayable
```

#### Parameters

| Name            | Type   | Description |
| --------------- | ------ | ----------- |
| \_remoteChainId | uint16 | undefined   |
| \_remoteAddress | bytes  | undefined   |

### storedCredits

```solidity
function storedCredits(bytes32) external view returns (uint16 srcChainId, address toAddress, uint256 index, bool creditsRemain)
```

#### Parameters

| Name | Type    | Description |
| ---- | ------- | ----------- |
| \_0  | bytes32 | undefined   |

#### Returns

| Name          | Type    | Description |
| ------------- | ------- | ----------- |
| srcChainId    | uint16  | undefined   |
| toAddress     | address | undefined   |
| index         | uint256 | undefined   |
| creditsRemain | bool    | undefined   |

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId) external view returns (bool)
```

_See {IERC165-supportsInterface}._

#### Parameters

| Name        | Type   | Description |
| ----------- | ------ | ----------- |
| interfaceId | bytes4 | undefined   |

#### Returns

| Name | Type | Description |
| ---- | ---- | ----------- |
| \_0  | bool | undefined   |

### transferOwnership

```solidity
function transferOwnership(address newOwner) external nonpayable
```

_Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner._

#### Parameters

| Name     | Type    | Description |
| -------- | ------- | ----------- |
| newOwner | address | undefined   |

### trustedRemoteLookup

```solidity
function trustedRemoteLookup(uint16) external view returns (bytes)
```

#### Parameters

| Name | Type   | Description |
| ---- | ------ | ----------- |
| \_0  | uint16 | undefined   |

#### Returns

| Name | Type  | Description |
| ---- | ----- | ----------- |
| \_0  | bytes | undefined   |

## Events

### CreditCleared

```solidity
event CreditCleared(bytes32 _hashedPayload)
```

_Emitted when `_hashedPayload` has been completely delivered_

#### Parameters

| Name            | Type    | Description |
| --------------- | ------- | ----------- |
| \_hashedPayload | bytes32 | undefined   |

### CreditStored

```solidity
event CreditStored(bytes32 _hashedPayload, bytes _payload)
```

_Emitted when `_payload` was received from lz, but not enough gas to deliver all tokenIds_

#### Parameters

| Name            | Type    | Description |
| --------------- | ------- | ----------- |
| \_hashedPayload | bytes32 | undefined   |
| \_payload       | bytes   | undefined   |

### MessageFailed

```solidity
event MessageFailed(uint16 _srcChainId, bytes _srcAddress, uint64 _nonce, bytes _payload, bytes _reason)
```

#### Parameters

| Name         | Type   | Description |
| ------------ | ------ | ----------- |
| \_srcChainId | uint16 | undefined   |
| \_srcAddress | bytes  | undefined   |
| \_nonce      | uint64 | undefined   |
| \_payload    | bytes  | undefined   |
| \_reason     | bytes  | undefined   |

### OwnershipTransferred

```solidity
event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
```

#### Parameters

| Name                    | Type    | Description |
| ----------------------- | ------- | ----------- |
| previousOwner `indexed` | address | undefined   |
| newOwner `indexed`      | address | undefined   |

### ReceiveFromChain

```solidity
event ReceiveFromChain(uint16 indexed _srcChainId, bytes indexed _srcAddress, address indexed _toAddress, uint256[] _tokenIds)
```

#### Parameters

| Name                   | Type      | Description |
| ---------------------- | --------- | ----------- |
| \_srcChainId `indexed` | uint16    | undefined   |
| \_srcAddress `indexed` | bytes     | undefined   |
| \_toAddress `indexed`  | address   | undefined   |
| \_tokenIds             | uint256[] | undefined   |

### ReceiveFromEth

```solidity
event ReceiveFromEth(address indexed from, address indexed to, uint256[] tokenIds)
```

#### Parameters

| Name           | Type      | Description |
| -------------- | --------- | ----------- |
| from `indexed` | address   | undefined   |
| to `indexed`   | address   | undefined   |
| tokenIds       | uint256[] | undefined   |

### RetryMessageSuccess

```solidity
event RetryMessageSuccess(uint16 _srcChainId, bytes _srcAddress, uint64 _nonce, bytes32 _payloadHash)
```

#### Parameters

| Name          | Type    | Description |
| ------------- | ------- | ----------- |
| \_srcChainId  | uint16  | undefined   |
| \_srcAddress  | bytes   | undefined   |
| \_nonce       | uint64  | undefined   |
| \_payloadHash | bytes32 | undefined   |

### SendToChain

```solidity
event SendToChain(uint16 indexed _dstChainId, address indexed _from, bytes indexed _toAddress, uint256[] _tokenIds)
```

_Emitted when `_tokenIds[]` are moved from the `_sender` to (`_dstChainId`, `_toAddress`) `_nonce` is the outbound nonce from_

#### Parameters

| Name                   | Type      | Description |
| ---------------------- | --------- | ----------- |
| \_dstChainId `indexed` | uint16    | undefined   |
| \_from `indexed`       | address   | undefined   |
| \_toAddress `indexed`  | bytes     | undefined   |
| \_tokenIds             | uint256[] | undefined   |

### SendToEth

```solidity
event SendToEth(address indexed from, address indexed to, uint256[] tokenIds)
```

#### Parameters

| Name           | Type      | Description |
| -------------- | --------- | ----------- |
| from `indexed` | address   | undefined   |
| to `indexed`   | address   | undefined   |
| tokenIds       | uint256[] | undefined   |

### SetDstChainIdToBatchLimit

```solidity
event SetDstChainIdToBatchLimit(uint16 _dstChainId, uint256 _dstChainIdToBatchLimit)
```

#### Parameters

| Name                     | Type    | Description |
| ------------------------ | ------- | ----------- |
| \_dstChainId             | uint16  | undefined   |
| \_dstChainIdToBatchLimit | uint256 | undefined   |

### SetDstChainIdToTransferGas

```solidity
event SetDstChainIdToTransferGas(uint16 _dstChainId, uint256 _dstChainIdToTransferGas)
```

#### Parameters

| Name                      | Type    | Description |
| ------------------------- | ------- | ----------- |
| \_dstChainId              | uint16  | undefined   |
| \_dstChainIdToTransferGas | uint256 | undefined   |

### SetMinDstGas

```solidity
event SetMinDstGas(uint16 _dstChainId, uint16 _type, uint256 _minDstGas)
```

#### Parameters

| Name         | Type    | Description |
| ------------ | ------- | ----------- |
| \_dstChainId | uint16  | undefined   |
| \_type       | uint16  | undefined   |
| \_minDstGas  | uint256 | undefined   |

### SetMinGasToTransferAndStore

```solidity
event SetMinGasToTransferAndStore(uint256 _minGasToTransferAndStore)
```

#### Parameters

| Name                       | Type    | Description |
| -------------------------- | ------- | ----------- |
| \_minGasToTransferAndStore | uint256 | undefined   |

### SetPrecrime

```solidity
event SetPrecrime(address precrime)
```

#### Parameters

| Name     | Type    | Description |
| -------- | ------- | ----------- |
| precrime | address | undefined   |

### SetTrustedRemote

```solidity
event SetTrustedRemote(uint16 _remoteChainId, bytes _path)
```

#### Parameters

| Name            | Type   | Description |
| --------------- | ------ | ----------- |
| \_remoteChainId | uint16 | undefined   |
| \_path          | bytes  | undefined   |

### SetTrustedRemoteAddress

```solidity
event SetTrustedRemoteAddress(uint16 _remoteChainId, bytes _remoteAddress)
```

#### Parameters

| Name            | Type   | Description |
| --------------- | ------ | ----------- |
| \_remoteChainId | uint16 | undefined   |
| \_remoteAddress | bytes  | undefined   |

## Errors

### LNEthVault\_\_NotKeeper

```solidity
error LNEthVault__NotKeeper()
```

### LNEthVault\_\_NotOwner

```solidity
error LNEthVault__NotOwner()
```

### LNEthVault\_\_TransferFromFailed

```solidity
error LNEthVault__TransferFromFailed(address from, address to, uint256 tokenId)
```

#### Parameters

| Name    | Type    | Description |
| ------- | ------- | ----------- |
| from    | address | undefined   |
| to      | address | undefined   |
| tokenId | uint256 | undefined   |