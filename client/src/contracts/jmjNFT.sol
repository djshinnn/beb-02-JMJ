// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC721Connector.sol";

contract jmjNFT is ERC721Connector{

    string[] public jmjnft;

    mapping(string => bool) _jmjnftExists;

    function mint(string memory _name) public {

        require(!_jmjnftExists[_name],'Error - nft already exists');
        jmjnft.push(_name);
        uint _id = jmjnft.length - 1;

        _mint(msg.sender, _id);

        _jmjnftExists[_name] = true;
    }

    constructor() ERC721Connector('jmjNFT', 'JMJ'){}
}