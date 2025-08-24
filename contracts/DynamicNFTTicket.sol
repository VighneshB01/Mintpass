// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DynamicNFTTicket is ERC721, ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;
    
    enum TicketState { UNUSED, ATTENDED, REWARDED }
    
    struct Ticket {
        uint256 eventId;
        address holder;
        TicketState state;
        uint256 mintedAt;
        uint256 attendedAt;
        uint256 rewardedAt;
        string qrCode;
    }
    
    mapping(uint256 => Ticket) public tickets;
    mapping(uint256 => string) private _eventNames;
    mapping(address => bool) public authorizedScanners;
    
    event TicketMinted(uint256 indexed tokenId, address indexed holder, uint256 eventId);
    event TicketScanned(uint256 indexed tokenId, address indexed scanner);
    event RewardUnlocked(uint256 indexed tokenId, address indexed holder);
    
    constructor(address initialOwner) ERC721("DynamicNFTTicket", "DNFT") Ownable(initialOwner) {}
    
    function mintTicket(
        address to,
        uint256 eventId,
        string memory eventName,
        string memory qrCode,
        string memory initialTokenURI
    ) public onlyOwner returns (uint256) {
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, initialTokenURI);
        
        tickets[tokenId] = Ticket({
            eventId: eventId,
            holder: to,
            state: TicketState.UNUSED,
            mintedAt: block.timestamp,
            attendedAt: 0,
            rewardedAt: 0,
            qrCode: qrCode
        });
        
        _eventNames[eventId] = eventName;
        
        emit TicketMinted(tokenId, to, eventId);
        return tokenId;
    }
    
    function markAsAttended(uint256 tokenId, string memory attendedTokenURI) 
        public 
        onlyAuthorizedScanner 
    {
        require(_ownerOf(tokenId) != address(0), "Ticket does not exist");
        require(tickets[tokenId].state == TicketState.UNUSED, "Ticket already used");
        
        tickets[tokenId].state = TicketState.ATTENDED;
        tickets[tokenId].attendedAt = block.timestamp;
        _setTokenURI(tokenId, attendedTokenURI);
        
        emit TicketScanned(tokenId, msg.sender);
    }
    
    function unlockReward(uint256 tokenId, string memory rewardTokenURI) 
        public 
        onlyOwner 
    {
        require(_ownerOf(tokenId) != address(0), "Ticket does not exist");
        require(tickets[tokenId].state == TicketState.ATTENDED, "Ticket not attended");
        
        tickets[tokenId].state = TicketState.REWARDED;
        tickets[tokenId].rewardedAt = block.timestamp;
        _setTokenURI(tokenId, rewardTokenURI);
        
        emit RewardUnlocked(tokenId, tickets[tokenId].holder);
    }
    
    function addAuthorizedScanner(address scanner) public onlyOwner {
        authorizedScanners[scanner] = true;
    }
    
    function removeAuthorizedScanner(address scanner) public onlyOwner {
        authorizedScanners[scanner] = false;
    }
    
    modifier onlyAuthorizedScanner() {
        require(authorizedScanners[msg.sender] || msg.sender == owner(), "Not authorized to scan");
        _;
    }
    
    function getTicketInfo(uint256 tokenId) public view returns (Ticket memory) {
        require(_ownerOf(tokenId) != address(0), "Ticket does not exist");
        return tickets[tokenId];
    }
    
    function getEventName(uint256 eventId) public view returns (string memory) {
        return _eventNames[eventId];
    }
    
    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter;
    }
    
    // Override required functions
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}