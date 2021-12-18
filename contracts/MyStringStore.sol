// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract MyStringStore {
  string public myString = "Hello World";
  event DataChanged(string indexed myString);

  function set(string memory x) public { 
    myString = x;
    emit DataChanged((x));
  }
}