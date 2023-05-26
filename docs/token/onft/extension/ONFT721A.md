# ONFT721A

## Methods

### DEFAULT_PAYLOAD_SIZE_LIMIT

```solidity
function DEFAULT_PAYLOAD_SIZE_LIMIT() external view returns (uint256)
```

#### Returns

| Name | Type    | Description |
| ---- | ------- | ----------- |
| \_0  | uint256 | undefined   |

### FUNCTION_TYPE_SEND

```solidity
function FUNCTION_TYPE_SEND() external view returns (uint16)
```

#### Returns

| Name | Type   | Description |
| ---- | ------ | ----------- |
| \_0  | uint16 | undefined   |

### approve

```solidity
function approve(address to, uint256 tokenId) external payable
```

_Gives permission to `to` to transfer `tokenId` token to another account. The approval is cleared when the token is transferred. Only a single account can be approved at a time, so approving the zero address clears previous approvals. Requirements: - The caller must own the token or be an approved operator. - `tokenId` must exist. Emits an {Approval} event._

#### Parameters

| Name    | Type    | Description |
| ------- | ------- | ----------- |
| to      | address | undefined   |
| tokenId | uint256 | undefined   |

### balanceOf

```solidity
function balanceOf(address owner) external view returns (uint256)
```

_Returns the number of tokens in `owner`&#39;s account._

#### Parameters

| Name  | Type    | Description |
| ----- | ------- | ----------- |
| owner | address | undefined   |

#### Returns

| Name | Type    | Description |
| ---- | ------- | ----------- |
| \_0  | uint256 | undefined   |

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

_estimate send token `_tokenId` to (`_dstChainId`, `_toAddress`) \_dstChainId - L0 defined chain id to send tokens too \_toAddress - dynamic bytes array which contains the address to whom you are sending tokens to on the dstChain \_tokenIds[] - token Ids to transfer \_useZro - indicates to use zro to pay L0 fees \_adapterParams - flexible bytes array to indicate messaging adapter services in L0_

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

_estimate send token `_tokenId` to (`_dstChainId`, `_toAddress`) \_dstChainId - L0 defined chain id to send tokens too \_toAddress - dynamic bytes array which contains the address to whom you are sending tokens to on the dstChain \_tokenId - token Id to transfer \_useZro - indicates to use zro to pay L0 fees \_adapterParams - flexible bytes array to indicate messaging adapter services in L0_

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

### getApproved

```solidity
function getApproved(uint256 tokenId) external view returns (address)
```

_Returns the account approved for `tokenId` token. Requirements: - `tokenId` must exist._

#### Parameters

| Name    | Type    | Description |
| ------- | ------- | ----------- |
| tokenId | uint256 | undefined   |

#### Returns

| Name | Type    | Description |
| ---- | ------- | ----------- |
| \_0  | address | undefined   |

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

### isApprovedForAll

```solidity
function isApprovedForAll(address owner, address operator) external view returns (bool)
```

_Returns if the `operator` is allowed to manage all of the assets of `owner`. See {setApprovalForAll}._

#### Parameters

| Name     | Type    | Description |
| -------- | ------- | ----------- |
| owner    | address | undefined   |
| operator | address | undefined   |

#### Returns

| Name | Type | Description |
| ---- | ---- | ----------- |
| \_0  | bool | undefined   |

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

### name

```solidity
function name() external view returns (string)
```

_Returns the token collection name._

#### Returns

| Name | Type   | Description |
| ---- | ------ | ----------- |
| \_0  | string | undefined   |

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
function onERC721Received(address, address, uint256, bytes) external nonpayable returns (bytes4)
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

### ownerOf

```solidity
function ownerOf(uint256 tokenId) external view returns (address)
```

_Returns the owner of the `tokenId` token. Requirements: - `tokenId` must exist._

#### Parameters

| Name    | Type    | Description |
| ------- | ------- | ----------- |
| tokenId | uint256 | undefined   |

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

### safeTransferFrom

```solidity
function safeTransferFrom(address from, address to, uint256 tokenId) external payable
```

_Equivalent to `safeTransferFrom(from, to, tokenId, &#39;&#39;)`._

#### Parameters

| Name    | Type    | Description |
| ------- | ------- | ----------- |
| from    | address | undefined   |
| to      | address | undefined   |
| tokenId | uint256 | undefined   |

### safeTransferFrom

```solidity
function safeTransferFrom(address from, address to, uint256 tokenId, bytes _data) external payable
```

_Safely transfers `tokenId` token from `from` to `to`. Requirements: - `from` cannot be the zero address. - `to` cannot be the zero address. - `tokenId` token must exist and be owned by `from`. - If the caller is not `from`, it must be approved to move this token by either {approve} or {setApprovalForAll}. - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer. Emits a {Transfer} event._

#### Parameters

| Name    | Type    | Description |
| ------- | ------- | ----------- |
| from    | address | undefined   |
| to      | address | undefined   |
| tokenId | uint256 | undefined   |
| \_data  | bytes   | undefined   |

### sendBatchFrom

```solidity
function sendBatchFrom(address _from, uint16 _dstChainId, bytes _toAddress, uint256[] _tokenIds, address payable _refundAddress, address _zroPaymentAddress, bytes _adapterParams) external payable
```

_send tokens `_tokenIds[]` to (`_dstChainId`, `_toAddress`) from `_from` `_toAddress` can be any size depending on the `dstChainId`. `_zroPaymentAddress` set to address(0x0) if not paying in ZRO (LayerZero Token) `_adapterParams` is a flexible bytes array to indicate messaging adapter services_

#### Parameters

| Name                | Type            | Description |
| ------------------- | --------------- | ----------- |
| \_from              | address         | undefined   |
| \_dstChainId        | uint16          | undefined   |
| \_toAddress         | bytes           | undefined   |
| \_tokenIds          | uint256[]       | undefined   |
| \_refundAddress     | address payable | undefined   |
| \_zroPaymentAddress | address         | undefined   |
| \_adapterParams     | bytes           | undefined   |

### sendFrom

```solidity
function sendFrom(address _from, uint16 _dstChainId, bytes _toAddress, uint256 _tokenId, address payable _refundAddress, address _zroPaymentAddress, bytes _adapterParams) external payable
```

_send token `_tokenId` to (`_dstChainId`, `_toAddress`) from `_from` `_toAddress` can be any size depending on the `dstChainId`. `_zroPaymentAddress` set to address(0x0) if not paying in ZRO (LayerZero Token) `_adapterParams` is a flexible bytes array to indicate messaging adapter services_

#### Parameters

| Name                | Type            | Description |
| ------------------- | --------------- | ----------- |
| \_from              | address         | undefined   |
| \_dstChainId        | uint16          | undefined   |
| \_toAddress         | bytes           | undefined   |
| \_tokenId           | uint256         | undefined   |
| \_refundAddress     | address payable | undefined   |
| \_zroPaymentAddress | address         | undefined   |
| \_adapterParams     | bytes           | undefined   |

### setApprovalForAll

```solidity
function setApprovalForAll(address operator, bool approved) external nonpayable
```

_Approve or remove `operator` as an operator for the caller. Operators can call {transferFrom} or {safeTransferFrom} for any token owned by the caller. Requirements: - The `operator` cannot be the caller. Emits an {ApprovalForAll} event._

#### Parameters

| Name     | Type    | Description |
| -------- | ------- | ----------- |
| operator | address | undefined   |
| approved | bool    | undefined   |

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

#### Parameters

| Name        | Type   | Description |
| ----------- | ------ | ----------- |
| interfaceId | bytes4 | undefined   |

#### Returns

| Name | Type | Description |
| ---- | ---- | ----------- |
| \_0  | bool | undefined   |

### symbol

```solidity
function symbol() external view returns (string)
```

_Returns the token collection symbol._

#### Returns

| Name | Type   | Description |
| ---- | ------ | ----------- |
| \_0  | string | undefined   |

### tokenURI

```solidity
function tokenURI(uint256 tokenId) external view returns (string)
```

_Returns the Uniform Resource Identifier (URI) for `tokenId` token._

#### Parameters

| Name    | Type    | Description |
| ------- | ------- | ----------- |
| tokenId | uint256 | undefined   |

#### Returns

| Name | Type   | Description |
| ---- | ------ | ----------- |
| \_0  | string | undefined   |

### totalSupply

```solidity
function totalSupply() external view returns (uint256)
```

_Returns the total number of tokens in existence. Burned tokens will reduce the count. To get the total number of tokens minted, please see {\_totalMinted}._

#### Returns

| Name | Type    | Description |
| ---- | ------- | ----------- |
| \_0  | uint256 | undefined   |

### transferFrom

```solidity
function transferFrom(address from, address to, uint256 tokenId) external payable
```

_Transfers `tokenId` from `from` to `to`. Requirements: - `from` cannot be the zero address. - `to` cannot be the zero address. - `tokenId` token must be owned by `from`. - If the caller is not `from`, it must be approved to move this token by either {approve} or {setApprovalForAll}. Emits a {Transfer} event._

#### Parameters

| Name    | Type    | Description |
| ------- | ------- | ----------- |
| from    | address | undefined   |
| to      | address | undefined   |
| tokenId | uint256 | undefined   |

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

### Approval

```solidity
event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)
```

_Emitted when `owner` enables `approved` to manage the `tokenId` token._

#### Parameters

| Name               | Type    | Description |
| ------------------ | ------- | ----------- |
| owner `indexed`    | address | undefined   |
| approved `indexed` | address | undefined   |
| tokenId `indexed`  | uint256 | undefined   |

### ApprovalForAll

```solidity
event ApprovalForAll(address indexed owner, address indexed operator, bool approved)
```

_Emitted when `owner` enables or disables (`approved`) `operator` to manage all of its assets._

#### Parameters

| Name               | Type    | Description |
| ------------------ | ------- | ----------- |
| owner `indexed`    | address | undefined   |
| operator `indexed` | address | undefined   |
| approved           | bool    | undefined   |

### ConsecutiveTransfer

```solidity
event ConsecutiveTransfer(uint256 indexed fromTokenId, uint256 toTokenId, address indexed from, address indexed to)
```

_Emitted when tokens in `fromTokenId` to `toTokenId` (inclusive) is transferred from `from` to `to`, as defined in the [ERC2309](https://eips.ethereum.org/EIPS/eip-2309) standard. See {\_mintERC2309} for more details._

#### Parameters

| Name                  | Type    | Description |
| --------------------- | ------- | ----------- |
| fromTokenId `indexed` | uint256 | undefined   |
| toTokenId             | uint256 | undefined   |
| from `indexed`        | address | undefined   |
| to `indexed`          | address | undefined   |

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

### Transfer

```solidity
event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)
```

_Emitted when `tokenId` token is transferred from `from` to `to`._

#### Parameters

| Name              | Type    | Description |
| ----------------- | ------- | ----------- |
| from `indexed`    | address | undefined   |
| to `indexed`      | address | undefined   |
| tokenId `indexed` | uint256 | undefined   |

## Errors

### ApprovalCallerNotOwnerNorApproved

```solidity
error ApprovalCallerNotOwnerNorApproved()
```

The caller must own the token or be an approved operator.

### ApprovalQueryForNonexistentToken

```solidity
error ApprovalQueryForNonexistentToken()
```

The token does not exist.

### BalanceQueryForZeroAddress

```solidity
error BalanceQueryForZeroAddress()
```

Cannot query the balance for the zero address.

### MintERC2309QuantityExceedsLimit

```solidity
error MintERC2309QuantityExceedsLimit()
```

The `quantity` minted with ERC2309 exceeds the safety limit.

### MintToZeroAddress

```solidity
error MintToZeroAddress()
```

Cannot mint to the zero address.

### MintZeroQuantity

```solidity
error MintZeroQuantity()
```

The quantity of tokens minted must be more than zero.

### OwnerQueryForNonexistentToken

```solidity
error OwnerQueryForNonexistentToken()
```

The token does not exist.

### OwnershipNotInitializedForExtraData

```solidity
error OwnershipNotInitializedForExtraData()
```

The `extraData` cannot be set on an unintialized ownership slot.

### TransferCallerNotOwnerNorApproved

```solidity
error TransferCallerNotOwnerNorApproved()
```

The caller must own the token or be an approved operator.

### TransferFromIncorrectOwner

```solidity
error TransferFromIncorrectOwner()
```

The token must be owned by `from`.

### TransferToNonERC721ReceiverImplementer

```solidity
error TransferToNonERC721ReceiverImplementer()
```

Cannot safely transfer to a contract that does not implement the ERC721Receiver interface.

### TransferToZeroAddress

```solidity
error TransferToZeroAddress()
```

Cannot transfer to the zero address.

### URIQueryForNonexistentToken

```solidity
error URIQueryForNonexistentToken()
```

The token does not exist.
