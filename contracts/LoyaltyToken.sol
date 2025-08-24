// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LoyaltyToken is ERC20, Ownable {
    mapping(address => bool) public hasClaimedReward;
    mapping(uint256 => bool) public eventRewardsClaimed;
    
    uint256 public constant ATTENDANCE_REWARD = 100 * 10**18; // 100 tokens
    uint256 public constant EARLY_BIRD_BONUS = 50 * 10**18;   // 50 tokens bonus
    
    event RewardClaimed(address indexed user, uint256 amount, uint256 eventId);
    
    constructor(address initialOwner) ERC20("EventLoyalty", "ELTY") Ownable(initialOwner) {
        // Mint initial supply to owner for distribution
        _mint(initialOwner, 1000000 * 10**18); // 1M tokens
    }
    
    function claimAttendanceReward(address attendee, uint256 eventId, bool isEarlyBird) 
        public 
        onlyOwner 
    {
        require(!eventRewardsClaimed[eventId], "Event rewards already claimed");
        
        uint256 rewardAmount = ATTENDANCE_REWARD;
        if (isEarlyBird) {
            rewardAmount += EARLY_BIRD_BONUS;
        }
        
        _transfer(owner(), attendee, rewardAmount);
        eventRewardsClaimed[eventId] = true;
        
        emit RewardClaimed(attendee, rewardAmount, eventId);
    }
    
    function batchRewardAttendees(
        address[] memory attendees, 
        uint256[] memory eventIds,
        bool[] memory earlyBirds
    ) public onlyOwner {
        require(
            attendees.length == eventIds.length && 
            eventIds.length == earlyBirds.length, 
            "Array lengths must match"
        );
        
        for (uint256 i = 0; i < attendees.length; i++) {
            if (!eventRewardsClaimed[eventIds[i]]) {
                claimAttendanceReward(attendees[i], eventIds[i], earlyBirds[i]);
            }
        }
    }
    
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}