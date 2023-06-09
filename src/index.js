import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

function geteweiArr(x) {
  const rowArr = new Array(x)
  return (y) => {
    const colArr = new Array(y)
    return Array.from(rowArr, () => [...colArr])
  }
}

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val
  this.next = next === undefined ? null : next
}

/*
let result = new Array(8)

function cal8queens(row) {
  if (row === 8) {
    printQueen(result)
    return false
  }

  for (let column = 0; column < 8; ++column) {
    if (isOk(row, column)) {
      result[row] = column
      cal8queens(row + 1)
    }
  }
  return false
}
function isOk(row, column) {
  let leftup = column - 1
  let rightup = column + 1
  for (let i = row - 1; i >= 0; --i) {
    if (result[i] === column) {
      return false
    }
    if (leftup >= 0) {
      if (result[i] === leftup) {
        return false
      }
    }
    if (rightup < 8) {
      if (result[i] === rightup) {
        return false
      }
    }
    --leftup
    ++rightup
  }
  return true
}

function printQueen(result) {
  console.log(result)
  // for(let row = 0;row <8;++row) {
  //   for(let column =0;column <8; ++column) {
  //     if(result[row] === column) {
  //       console.log('Q')
  //     } else {
  //       console.log('*')
  //     }
  //   }
  // }
}

// cal8queens(0)



let weight // 物品重量，
let n // 物品个数
let w //背包可承载重量

function knapsack(weight, value, n, w) {
  const states = geteweiArr(n)(w + 1)
  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < w + 1; ++j) {
      states[i][j] = -1
    }
  }
  states[0][0] = 0
  states[0][weight[0]] = value[0]

  for (let i = 1; i < n; ++i) {
    for (let j = 0; j <= w; ++j) {
      if (states[i - 1][j] >= 0) {
        states[i][j] = states[i - 1][j]
      }
    }
    for (let j = 0; j <= w - weight[i]; ++j) {
      if (states[i - 1][j] >= 0) {
        let v = states[i - 1][j] + value[i]
        states[i][j + weight[i]] = v
      }
    }
  }

  let maxValue = -1
  for (let j = 0; j <= w; ++j) {
    if (states[n - 1][j] >= maxValue) {
      maxValue = states[n - 1][j]
    }
  }
  console.log(states)
  return maxValue
}

function knapsack2(items, n, w) {
  const states = new Array(w + 1)
  states[0] = true
  states[items[0]] = true

  for (let i = 1; i < n; ++i) {
    for (let j = w - items[i]; j >= 0; --j) {
      if (states[j] === true) {
        states[j + items[i]] = true
      }
    }
  }
  console.log(states)

  for (let i = w; i >= 0; --i) {
    if (states[i] === true) {
      return i
    }
  }
  return 0
}

function getLj(list) {
  const maxList = list.map((item) => item.length)
  const row = Math.max.apply({}, maxList)
  const col = list.length
  // console.log(row,col,'====')

  const resultArr = geteweiArr(row)(col)
  resultArr[0][0] = list[0][0]
  let minVal = Infinity
  for (let i = 0; i < row; ++i) {
    for (let j = 0; j < col - i; ++j) {
      const cur = list[i][j]
      let left = cur
      let right = cur
      if (i > 0) {
        left = resultArr[i - 1][j] + cur
      }
      if (j > 0) {
        right = resultArr[i][j - 1] + cur
      }
      if (i === 0 || j == 0) {
        resultArr[i][j] = Math.max(left, right)
      } else {
        resultArr[i][j] = Math.min(left, right)
      }

      if (i === col - j - 1 && resultArr[i][j] <= minVal) {
        minVal = resultArr[i][j]
      }
    }
  }

  console.log(resultArr, minVal)
}

const matrix = [
  [1, 3, 5, 9],
  [2, 1, 3, 4],
  [5, 2, 6, 7],
  [6, 8, 4, 3],
]

const mem = geteweiArr(4)(4)

function minDist(i, j) {
  // 调用minDist(n -1,n -1)
  console.log(i, j, '----')
  if (i == 0 && j === 0) {
    return matrix[0][0]
  }
  if (mem[i][j] > 0) {
    return mem[i][j]
  }
  let minLeft = Infinity
  if (j - 1 >= 0) {
    minLeft = minDist(i, j - 1)
  }

  let minUp = Infinity
  if (i - 1 >= 0) {
    minUp = minDist(i - 1, j)
  }

  let currMinDist = matrix[i][j] + Math.min(minLeft, minUp)
  mem[i][j] = currMinDist

  return currMinDist
}


const init = [1, 3, 5, 8]

const arreeee = {}

function getTotal(l) {
  const lll = dist(l).reduce((t, cu) => {
    return t + cu
  }, 0)
  return lll
}

function getArNum(t, n, l) {
  let rlist = []
  if (t == n + getTotal(t - n)) {
    const result = dist(t - n).concat([n])
    if (rlist.length <= l) {
      rlist = result
    }
  }
  return rlist
}

function dist(t) {
  if (arreeee[t] && arreeee[t].length > 0) {
    return arreeee[t]
  }

  if (init.findIndex((l) => l === t) > -1) {
    arreeee[t] = [t]
    return [t]
  }

  let ar = []
  let l = Infinity
  let max = Math.max.apply({}, init)
  if (t > max) {
    for (let i = 0; i < init.length; i++) {
      const resultL = getArNum(t, init[i], l)
      if (resultL.length > 0) {
        l = resultL.length
        ar = resultL
      }
    }
  }
  arreeee[t] = ar

  return ar
}


function lcs(a, n, b, m) {
  let maxlcs = geteweiArr(n)(m)
  for (let j = 0; j < m; ++j) {
    if (a[0] == b[j]) {
      maxlcs[0][j] = 1
    } else if (j != 0) {
      maxlcs[0][j] = maxlcs[0][j - 1]
    } else {
      maxlcs[0][j] = 0
    }
    for (let i = 0; i < n; ++i) {
      if (a[i] == b[0]) {
        maxlcs[i][0] = 1
      } else if (j != 0) {
        maxlcs[i][0] = maxlcs[i - 1][0]
      } else {
        maxlcs[i][0] = 0
      }
    }

    for (let i = 1; i < n; ++i) {
      for (let j = 1; j < m; ++j) {
        if (a[i] === b[j]) {
          maxlcs[i][j] = Math.max(
            maxlcs[i - 1][j],
            maxlcs[i][j - 1],
            maxlcs[i - 1][j - 1] + 1,
          )
        } else {
          maxlcs[i][j] = Math.max(
            maxlcs[i - 1][j],
            maxlcs[i][j - 1],
            maxlcs[i - 1][j - 1] + 1,
          )
        }
      }
     
    }
  }
  return maxlcs[n - 1][m - 1]
}


const initArr = [2, 9, 3, 6, 5, 1, 7]

function getLongArr(nums) {
  if (nums.length <= 1) {
    return nums.length
  }

  let n = nums.length
  let maxLength = 0
  let dp = []
  dp[0] = 1
  for (let i = 1; i < n; i++) {
    let max = 0
    for (let j = i - 1; j >= 0; j--) {
      if (nums[j] < nums[i]) {
        max = Math.max(dp[j], max)
      }
    }
    dp[i] = max + 1
    maxLength = Math.max(maxLength, dp[i])
  }
  return maxLength
}

function getNums(nums) {
  let ans = []
  for (let i = 0; i < nums.length; i++) {
    let left = 0
    let right = ans.length
    while (left < right) {
      let mid = (left + right) >>> 1
      if (ans[mid] < nums[i]) {
        left = mid + 1
      } else {
        right = mid
      }
    }
    if (right >= ans.length) {
      ans.push(nums[i])
    } else {
      ans[right] = nums[i]
    }
  }

  return ans.length
}
function isMatch(s, p) {
  if (s === p) {
    return true
  }
  for (let i = 0; i < p.length; i++) {
    console.log(p[i])
  }
}

function getZj(nums) {
  Math.floor(nums.length / 2)
}

function findkth(arr1, start1, end1, arr2, start2, end2, k) {
  let n = end1 - start1 + 1;
  let m = end2 - start2 + 1;
  if(n > m) return findkth(arr2, start2, end2, arr1, start1, end1, k);
  if(n === 0) return arr2[start2 + k - 1];
  if(k === 1) return Math.min(arr1[start1], arr2[start2]);
  let i = start1 + Math.min(n, Math.floor(k / 2)) - 1;
  let j = start2 + Math.min(m, Math.floor(k / 2)) - 1;
  if(arr1[i] > arr2[j]) {
      return findkth(arr1, start1, end1, arr2, j + 1, end2, k - (j - start2 + 1));
  } else {
      return findkth(arr1, i + 1, end1, arr2, start2, end2, k - (i - start1 + 1));
  }
}


var findMedianSortedArrays = function (nums1, nums2) {
  let len1 = nums1.length;
    let len2 = nums2.length;
    let left = Math.floor((len1 + len2 + 1) / 2);
    let right = Math.floor((len1 + len2 + 2) / 2);
    return (findkth(nums1, 0, len1 - 1, nums2, 0, len2 - 1, left) + findkth(nums1, 0 , len1 - 1, nums2, 0, len2 - 1, right)) / 2;
}

const re = findMedianSortedArrays([1,2],[3,4])

console.log(re)


let height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]

function getVol(height) {
  let arr = []
  let leftArr = []
  let rightArr = []
  for (let i = 1; i < height.length - 1; i++) {
    leftArr[i] = Math.max(leftArr[i - 1] || 0, height[i - 1])
  }

  for (let i = height.length - 2; i >= 0; --i) {
    rightArr[i] = Math.max(rightArr[i + 1] || 0, height[i + 1])
  }
  for (let i = 1; i < height.length - 1; i++) {
    let c = height[i]

    let min = Math.min(leftArr[i], rightArr[i])

    if (c < min) {
      arr[i] = min - c
    }
  }
  // console.log(arr)
  return arr.reduce((sum, cu) => {
    return sum + cu
  }, 0)
}

function getTotal(height){
  let total = 0;
  
  let left = 0;
  let right = height.length -1;
  let leftMax = 0,rightMax = 0;


  while(left < right) {
    leftMax = Math.max(leftMax, height[left])
    rightMax = Math.max(rightMax, height[right])
    if(height[left] < height[right]) {
      total += leftMax - height[left]
      ++ left
    } else {
      total += rightMax - height[right]
      --right
    }
  }
  return total
}

const result = getVol(height)


function getLen(s) {
   // 哈希集合，记录每个字符是否出现过
   const occ = new Set()
   const n = s.length
   // 右指针，初始值为 -1，相当于我们在字符串的左边界的左侧，还没有开始移动
   let rk = -1,
     ans = 0
   for (let i = 0; i < n; ++i) {
     if (i != 0) {
       // 左指针向右移动一格，移除一个字符
       occ.delete(s.charAt(i - 1))
     }
     while (rk + 1 < n && !occ.has(s.charAt(rk + 1))) {
       // 不断地移动右指针
       occ.add(s.charAt(rk + 1))
       ++rk
     }
     console.log(rk,'---')
     // 第 i 到 rk 个字符是一个极长的无重复字符子串
     ans = Math.max(ans, rk - i + 1)
   }
   return ans
}

var lengthOfLongestSubstring = function (s) {
  const re = getLen(s)
  console.log(re)
}

lengthOfLongestSubstring('abcabccbb')



function lNtoArr(v) {
  let curv = v.val
  let arr = [curv]
  if (v.next) {
    arr = arr.concat(lNtoArr(v.next))
  }
  return arr
}

function arrToLN(arr) {
  let obj = null
  for (let i = arr.length - 1; i >= 0; --i) {
    let next = obj
    obj = new ListNode(arr[i], next)
  }
  return obj
}

var addTwoNumbers = function (l1, l2) {
  let l1Cache = l1
  let l2Cache = l2
  let result = []
  let jw = 0
  
  while (l1Cache || l2Cache) {
    
    let total = (l1Cache ? l1Cache.val : 0) + (l2Cache ? l2Cache.val : 0)
    total += jw
    let currVal = total % 10
    
    if (total >= 10) {
      jw = 1
    } else {
      jw = 0
    }

    l1Cache = l1Cache && l1Cache.next
    l2Cache = l2Cache && l2Cache.next
    result.push(currVal)
  }
  if( jw > 0) {
    result.push(jw)
  }
  return arrToLN(result)
}

var l1 = arrToLN([9,9,9,9,9,9,9])

var l2 = arrToLN([9,9,9,9])

addTwoNumbers(l1, l2)


function ppx(s, p) {
  if (s == null || p == null) return false;

  const sLen = s.length, pLen = p.length;

  const dp = new Array(sLen + 1);
  for (let i = 0; i < dp.length; i++) {
    dp[i] = new Array(pLen + 1).fill(false); // 将项默认为false
  }
  console.log(dp,'---')

  // base case
  dp[0][0] = true;
  for (let j = 1; j < pLen + 1; j++) {
    if (p[j - 1] == "*") dp[0][j] = dp[0][j - 2];
  }
  // 迭代
  for (let i = 1; i < sLen + 1; i++) {
    for (let j = 1; j < pLen + 1; j++) {

      if (s[i - 1] == p[j - 1] || p[j - 1] == ".") {
        dp[i][j] = dp[i - 1][j - 1];
      } else if (p[j - 1] == "*") {
        if (s[i - 1] == p[j - 2] || p[j - 2] == ".") {
          dp[i][j] = dp[i][j - 2] || dp[i - 1][j - 2] || dp[i - 1][j];
        } else {
          dp[i][j] = dp[i][j - 2];
        }
      }
    }
  }
  return dp[sLen][pLen]; // 长sLen的s串 是否匹配 长pLen的p串
}

var isMatch = function (s, p) {
  const result = ppx(s, p)
  console.log(result, '---')
}

isMatch('mississippi', 'mis*is*ip*.')

var solveSudoku = function (board) {


  function isValid(row, col, val, board) {
    let len = board.length
    // 行不能重复
    for (let i = 0; i < len; i++) {
      if (board[row][i] === val) {
        return false
      }
    }
    // 列不能重复
    for (let i = 0; i < len; i++) {
      if (board[i][col] === val) {
        return false
      }
    }
    let startRow = Math.floor(row / 3) * 3
    let startCol = Math.floor(col / 3) * 3

    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (board[i][j] === val) {
          return false
        }
      }
    }

    return true
  }

  function backTracking() {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        if (board[i][j] !== '.') continue
        for (let val = 1; val <= 9; val++) {
          if (jungelVal(i, j, `${val}`, board)) {
            board[i][j] = `${val}`
            if (backTracking()) {
              return true
            }
            board[i][j] = `.`
          }
        }
        return false
      }
    }
    return true
  }
  backTracking(board)
  return board

}

const resu = solveSudoku([[".", ".", "9", "7", "4", "8", ".", ".", "."], ["7", ".", ".", ".", ".", ".", ".", ".", "."], [".", "2", ".", "1", ".", "9", ".", ".", "."], [".", ".", "7", ".", ".", ".", "2", "4", "."], [".", "6", "4", ".", "1", ".", "5", "9", "."], [".", "9", "8", ".", ".", ".", "3", ".", "."], [".", ".", ".", "8", ".", "3", ".", "2", "."], [".", ".", ".", ".", ".", ".", ".", ".", "6"], [".", ".", ".", "2", "7", "5", "9", ".", "."]])


function isValid(s, start, end) {
  let length = end - start + 1
  let hasMid = length % 2 !== 0
  let total = start + end
  let isValid = true
  let mv = Math.floor(length / 2)
  for (let i = start; i < start + mv; i++) {
    if (s[i] !== s[total - i]) {
      isValid = false
      break
    }
  }
  return isValid
}

function getStr(s, start, end) {
  let result = ''
  for (let i = start; i < end + 1; i++) {
    for (let j = end; j > i; j--) {
      if (s[i] === s[j]) {
        if(isValid(s,i,j)) {
          let rsss = s.substring(i,j+1)
          if(rsss.length > result.length) {
            result = rsss
          }
        }
      }
    }
  }
  return result
}

var longestPalindrome = function (s) {
  if(s.length < 2) {
    return s
}
  let result = ''
  for (let i = 0; i < s.length; i++) {
    for (let j = s.length -1; j > i; j--) {
      if (s[i] === s[j]) {
        if(isValid(s,i,j)) {
          let rsss = s.substring(i,j+1)
          if(rsss.length > result.length) {
            result = rsss
          }
        }
      }
    }
  }
  if(!result) {
    return s[0]
  }
  return result
};

var convert = function (s, numRows) {
  let arr = geteweiArr(numRows)(s.length)
  let news = s
  function bl(lie) {
    if (!news) {
      return false
    }
  
    for (let i = 0; i < numRows; i++) {
      arr[i][lie] = news[0]
      news = news.substring(1)

    }
    for (let i = numRows - 2; i > 0; i--) {
      for (let j = lie + 1; j < lie + 1 + numRows - 2; j++) {
        if ((i + j) % (numRows - 1) === 0) {
          if(!news) {
            return false
          }
          arr[i][j] = news[0]
          news = news.substring(1)
        }
      }
    }
    bl(lie + numRows -1)
  }
  bl(0)
 
  let arrText = arr.map(item => {
    return item.join('')
  }).join('')

  return arrText
};



var myAtoi = function(s) {
  let min = Math.pow(-2,31)
  let max = Math.pow(2,31) -1
  let result = s.trim().match(/^[-|+]{0,1}[0-9]+/)
  console.log(result,'----')
  let resulst = parseInt(s)
  if(isNaN(resulst)) {
    return 0
  }
  resulst =  resulst < min ? min : resulst
  resulst = resulst > max ? max : resulst
  return resulst
};



var maxArea = function (height) {
  let len = height.length
 
  let maxValumn = 0
  
  let i = 0
  let j = len -1
  while( j > i){
    if(height[i] < height[j]) {
      maxValumn = Math.max(maxValumn,height[i] * (j-i) )
      i ++
    } else {
      maxValumn = Math.max(maxValumn,height[j] * (j-i) )
      j--
    }
  }
  return maxValumn

};


var romanToInt = function (s) {

  let arr1 = [[1, 'I'], [5, 'V'], [10, 'X'], [50, 'L'], [100, 'C'], [500, 'D'], [1000, 'M']]
  let arr2 = [[4, 'IV'], [9, 'IX'], [40, 'XL'], [90, 'XC'], [400, 'CD'], [900, 'CM']]
  let news = s

  for (let i = 0; i < arr2; i++) {
    news = news.replace(arr2[i][1], arr2[0])
  }
  for (let i = 0; i < arr1; i++) {
    news = news.replace(arr1[i][1], arr1[0])
  }

  return news
};

console.log(romanToInt('III'))


var threeSum = function (nums) {
  let numList = nums.sort((a, b) => a - b)



  let result = []
  for (let i = 0; i < numList.length; i++) {

    if (numList[i] > 0) {
      break
    }

    if (i > 0 && numList[i] === numList[i - 1]) {
      continue
    }

    let L = i + 1;
    let R = len - 1;
    while (L < R) {
      const sum = nums[i] + nums[L] + nums[R];
      if (sum == 0) {
        ans.push([nums[i], nums[L], nums[R]]);
        while (L < R && nums[L] == nums[L + 1]) L++; // 去重
        while (L < R && nums[R] == nums[R - 1]) R--; // 去重
        L++;
        R--;
      }
      else if (sum < 0) L++;
      else if (sum > 0) R--;
    }

  }


  console.log(result, '---', arr)
};

threeSum([-2, 0, 1, 1, 2])




var letterCombinations = function (digits) {
  let res = [];
  if (digits == "") {
    return res;
  }
  let arr = [];
  let map = {
    '2': ['a', 'b', 'c'],
    '3': ['d', 'e', 'f'],
    '4': ['g', 'h', 'i'],
    '5': ['j', 'k', 'l'],
    '6': ['m', 'n', 'o'],
    '7': ['p', 'q', 'r', 's'],
    '8': ['t', 'u', 'v'],
    '9': ['w', 'x', 'y', 'z']
  };
  digits.split("").map(_ => {
    arr.push(map[_]);
  });

  console.log(arr)
  function dfs(temp, depth) {
    
    if (depth == arr.length) {
      res.push([...temp].join(""));
      return;
    }
    for (let i = 0; i < arr[depth].length; i++) {
      temp.push(arr[depth][i]); 
      dfs(temp, depth + 1);
      temp.pop();
    }
  }
  dfs([], 0);
  return res;

};

console.log(letterCombinations('23'))

var fourSum = function (nums, target) {
  nums.sort((a, b) => a - b)
  let list = []
  for (let i = 0; i < nums.length - 2; i++) {
    let F = nums[i]
    


    for (let j = nums.length - 1; j > i + 2; j--) {
      let L = i + 1
      let R = j - 1

      while (L < R) {
        const result = F + nums[L] + nums[R] + nums[j]
        if (result === target) {
          const newStr = `${F},${nums[L]},${nums[R]},${nums[j]}`
          const listStr = list.join('|')
          
          if (listStr.indexOf(newStr) === -1) {
            list.push(newStr)
          }


          if (nums[L] === nums[L + 1]) {
            L++
          }
          if (nums[R] === nums[R - 1]) {
            R--
          }
          L++
          R--

        } else if (result > target) {
          R--
        } else {
          L++
        }
      }

    }
  }


  return list.map(item => {
    return item.split(',').map(el => +el)
  })

};

console.log(fourSum([-3, -1, 0, 2, 4, 5],2))



var removeNthFromEnd = function (head, n) {
  let dhead = new ListNode(0, head);
  let cur = dhead   // 快指针
  let slow = dhead  // 慢指针
  let count = 0;    // 计算快指针跟慢指针中间的节点个数 类似于滑动窗口
  while (cur.next) {  // 当 快指针的下一个存在时
    cur = cur.next; // 移动快指针到下一个指针
    // 这里用 if else 当n=2时，循环到第三遍才会移动慢指针，所以刚好指向要删去的节点的前一个节点
    if (count === n) {

      // 当节点个数符合条件
      slow = slow.next  // 移动慢指针
    } else {
      count++     // 当不符合条件时，继续计算个数
    }
  }
  // 注意：慢指针最终指向要删去的节点的前一个节点
  slow.next = slow.next.next
  return dhead.next.next

};
*/

function getNodeList(arr) {
  let ListObj = {}

  arr.reverse().forEach((v) => {
    ListObj.next = new ListNode(v, ListObj.next)
    ListObj.val = v
  })
  ListObj = ListObj.next
  return ListObj
}

/** 

var mergeTwoLists = function (list1, list2) {
  if (list1 === null) {
    return list2;
  } else if (list2 === null) {
    return list1;
  } else if (list1.val < list2.val) {
    list1.next = mergeTwoLists(list1.next, list2);
    return list1;
  } else {
    list2.next = mergeTwoLists(list1, list2.next);
    return list2;
  }

};


console.log(mergeTwoLists(getNodeList([1, 2, 4]), getNodeList([1, 3, 4])))


var generateParenthesis = function (n) {
  const res = [];

  const dfs = (lRemain, rRemain, str) => { // 左右括号所剩的数量，str是当前构建的字符串
    if (str.length == 2 * n) { // 字符串构建完成
      res.push(str);           // 加入解集
      return;                  // 结束当前递归分支
    }
    if (lRemain > 0) {         // 只要左括号有剩，就可以选它，然后继续做选择（递归）
      dfs(lRemain - 1, rRemain, str + "(");
    }
    if (lRemain < rRemain) {   // 右括号比左括号剩的多，才能选右括号
      dfs(lRemain, rRemain - 1, str + ")"); // 然后继续做选择（递归）
    }
  };

  dfs(n, n, ""); // 递归的入口，剩余数量都是n，初始字符串是空串
  return res;
};

console.log(generateParenthesis(3))


var swapPairs = function(head) {
  if(!head || head.next ===null) {
    return head
  }
  const newHead = head.next
  head.next = swapPairs(newHead.next)
  newHead.next = head
  return newHead
};
console.log(swapPairs(getNodeList([1,2,3,4])))


var reverseKGroup = function (head, k) {

  const newMap = new Map()

  let len = 0
  let cur = head
  while (cur) {
    newMap.set(len, cur)
    len++
    cur = cur.next
  }
  
  let count = Math.floor(len / k)

  for (let i = 0; i < count; i++) {
    reverseList(i * k, (i + 1) * k - 1)
  }

  function reverseList(left, right) {
    if (right <= left) {
      return false
    }

    let leftListNode = newMap.get(left)
    let rightListNode = newMap.get(right)
    newMap.set(left ,rightListNode)
    newMap.set(right, leftListNode)
    reverseList(left+1, right -1)
  }
  
 
  const result = [...newMap.values()].map(item => item.val)
  
  return getNodeList(result)
};
console.log(reverseKGroup(getNodeList([1, 2, 3, 4, 5]), 2))


var removeDuplicates = function(nums) {
  let list = nums.filter((num, index) => {
    if(index > 0 && nums[index - 1] === num ) {
      return false
    }
    return true
  })
  list.forEach((li,index) => {
    nums[index] = li
  })
  
  return list.length
};
console.log(removeDuplicates([1,1,2]))




var divide = function (dividend, divisor) {
  if (divisor === 0) return Infinity;
    if (dividend === 0) return 0;
    if (dividend === -2147483648 && divisor === -1) return 2147483647;

    let res = 0;
    let flag = '';
    if (dividend < 0 && divisor > 0 || dividend > 0 && divisor < 0) {
        flag = '-';
    }
    dividend = Math.abs(dividend);
    divisor = Math.abs(divisor);
    
    while (dividend >= divisor) {
        let temp = divisor, m = 1;
        while (temp <= (dividend / 2)) { // 位运算模拟乘法，撑到最大。防止溢出
            temp *=2;
            m *= 2;
        }
        
        dividend -= temp;
        res += m;
    }

    return parseInt(flag + res);
};




console.log(divide(11, 3))


var findSubstring = function (s, words) {
  const res = [];
  const m = words.length, n = words[0].length, ls = s.length;
  for (let i = 0; i < n; i++) {
    if (i + m * n > ls) {
      break;
    }
    const differ = new Map();
    for (let j = 0; j < m; j++) {
      const word = s.substr(i + j * n, n);
      differ.set(word, (differ.get(word) || 0) + 1);
    }
    for (const word of words) {
      differ.set(word, (differ.get(word) || 0) - 1);
      if (differ.get(word) === 0) {
        differ.delete(word);
      }
    }

    console.log(i, [...differ])

    
    for (let start = i; start < ls - m * n + 1; start += n) {
      if (start !== i) {
        let word = s.substring(start + (m - 1) * n, start + m * n);
        
        differ.set(word, (differ.get(word) || 0) + 1);
        if (differ.get(word) === 0) {
          differ.delete(word);
        }
        word = s.substring(start - n, start);
        differ.set(word, (differ.get(word) || 0) - 1);
        if (differ.get(word) === 0) {
          differ.delete(word);
        }
      }
      if (differ.size === 0) {
        res.push(start);
      }
    }
  }
  return res;
};


console.log(findSubstring('barfoothefoobarman', ["foo", "bar"]))


var nextPermutation = function (nums) {

  let index = nums.length - 1

  let find = false
  for (let i = nums.length - 2; i >= 0; i--) {
    for (let j = nums.length - 1; j > i; j--) {
      if (nums[j] > nums[i] && !find) {
        const jval = nums[j]
        const ival = nums[i]
        nums[i] = jval
        nums[j] = ival
        index = i
        find = true
        break
      }
    }
  }

  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      if (i > index && j > i && nums[j] < nums[i]) {
        let result = nums[i]
        nums[i] = nums[j]
        nums[j] = result
      }
    }
  }

  if (index === nums.length - 1) {
    nums.sort((a, b) => a - b)
  } 


  return nums
};

console.log(nextPermutation([5,4,7,5,3,2]))


var longestValidParentheses = function (s) {
  let maxLen = 0
  const len = s.length
  let dp = new Array(len).fill(0)
  for (let i = 0; i < len; i++) {
    if (s[i] == ')') {
      if (s[i - 1] == '(') {
        if (i - 2 >= 0) {
          dp[i] = dp[i - 2] + 2
        } else {
          dp[i] = 2
        }
      } else if (s[i - dp[i - 1] - 1] == '(') {
        if (i - dp[i - 1] - 2 >= 0) {
          dp[i] = dp[i - 1] + 2 + dp[i - dp[i - 1] - 2]
        } else {
          dp[i] = dp[i - 1] + 2
        }
      }
    }
    maxLen = Math.max(maxLen, dp[i])
  }

  return maxLen


};
console.log(longestValidParentheses("()(())"))

var isValidSudoku = function (board) {

  const allBool = board.every(b => {
    return getResult(b)
  })

  function getResult(arr) {
    let count = {}
    const result = arr.every(num => {
      if (num !== '.') {
        if (!count[num]) {
          count[num] = 1
          return true
        } else {
          return false
        }
      } else {
        return true
      }
    })
    return result
  }

  let transArr = [[], [], [], [], [], [], [], [], []]
  board.forEach((bf, i) => {
    const arr = [[], [], []]
    bf.forEach((item, index) => {
      let suffix = Math.floor(index / 3)
      arr[suffix].push(item)
    })
    let suff = Math.floor(i / 3)
    arr.forEach((item, i) => {
      let result = transArr[suff + i * 3]
      transArr[suff + i * 3] = result.concat(item)
    })
  })

  const clbool = transArr.every(b => {
    return getResult(b)
  })

  let transArrList = [[], [], [], [], [], [], [], [], []]

  board.forEach((bf, i) => {
   
    bf.forEach((item, index) => {
      transArrList[index].push(item)
    })

  })

  const dlbool = transArrList.every(b => {
    return getResult(b)
  })
  return allBool && clbool && dlbool
};

var board =
  [["5", "3", ".", ".", "7", ".", ".", ".", "."]
    , ["6", ".", ".", "1", "9", "5", ".", ".", "."]
    , [".", "9", "8", ".", ".", ".", ".", "6", "."]
    , ["8", ".", ".", ".", "6", ".", ".", ".", "3"]
    , ["4", ".", ".", "8", ".", "3", ".", ".", "1"]
    , ["7", ".", ".", ".", "2", ".", ".", ".", "6"]
    , [".", "6", ".", ".", ".", ".", "2", "8", "."]
    , [".", ".", ".", "4", "1", "9", ".", ".", "5"]
    , [".", ".", ".", ".", "8", ".", ".", "7", "9"]]




console.log(isValidSudoku(board))



var countAndSay = function (n) {
  const list = []
  list[0] = '1'

  function getStr(str) {

    const arr = [str[0]]
    for (let i = 1; i < str.length; i++) {
      let lastStr = arr[arr.length - 1][0]
      if (str[i] === lastStr) {
        arr[arr.length - 1] = `${arr[arr.length - 1]}${str[i]}`
      } else {
        arr.push(str[i])
      }
    }


    const newStr = arr.map(item => {
      const el = item[0]
      return `${item.length}${el}`
    }).join('')
    list.push(newStr)
    if (list.length < n) {
      getStr(newStr)
    }

  }
  getStr('1')
  return list[n - 1]
};

console.log(countAndSay(4))



function pushList(list, arr) {

  const l = list.map(li => {
    return li.sort()
  })

  const result = arr.sort()
  let resultbool = false
  l.forEach(item => {
    const ssss = item.every((el, index) => el === result[index])
    if (ssss) {
      resultbool = true
    }
  })
  return l.length === 0 ? false : resultbool

}

var combinationSum = function (candidates, target) {
  let arr = []
  if (candidates.includes(target)) {
    arr.push([target])
  }

  const list = candidates.filter(cs => cs < target)

  const map = new Map()

  list.forEach((item) => {
    map.set(item, Math.floor(target / item))
  })

  const mapList = [...map.entries()]
  mapList.forEach(mp => {
    const num = mp[0]
    const max = mp[1]
    const syList = list.filter(v => v !== num)
    
    
      for (let i = 1; i <= max; i++) {
        const newTarget = target - num * i
        const min = syList.length >0 ? Math.min.apply({}, syList) : 0
        
        if (newTarget < min && newTarget !== 0) {
          continue
        }
        let listArr = []
        if (newTarget !== 0) {
          listArr = combinationSum(syList, newTarget)

        }
        if (listArr.length > 0 || newTarget === 0) {
          const result = new Array(i).fill(num)
          if (newTarget !== 0) {
            const llll = listArr.map(la => la.concat(result))

            llll.forEach(li => {
              if (!pushList(arr, li)) {
                arr.push(li)
              }

            })
          } else {
            if (!pushList(arr, result)) {
              arr.push(result)
            }
          }
        }
      }
    

  })
  return arr
};

console.log(combinationSum([7, 3, 9, 6], 6))



function isIn(arr, item) {
  let bool = false
  const newItem = item.sort()

  for (let i = 0; i < arr.length; i++) {
    const el = arr[i]
    const newEl = el.sort()
    bool = newItem.every((nim, index) => nim === newEl[index])
    if (bool) {
      break;
    }
  }

  return bool

}
var combinationSum2 = function (candidates, target) {
  const res = [];
  const list = candidates.sort()
  const dfs = (start, temp, sum) => {
    if (sum >= target) {        // 爆掉了，不用继续选数了
      if (sum == target) {      // 加入解集
        res.push([...temp]); // temp的拷贝
      }
      return;                   // 结束当前递归
    }
    for (let i = start; i < list.length; i++) { // 枚举出选择，从start开始
      if (i - 1 >= start && list[i - 1] === list[i]) {
        continue
      }
      temp.push(list[i]);          // 加入“部分解”
      dfs(i + 1, temp, sum + list[i]); // 往下继续选择，同时sum累加上当前数字
      temp.pop();                        // 撤销选择
    }
  };
  dfs(0, [], 0);
  return res
};

console.log
(combinationSum2([10, 1, 2, 7, 6, 1, 5]
  , 8))


var firstMissingPositive = function (nums) {

  const list = nums.sort((a,b) => a - b).filter(num => num > 0)

  if (list[0] !== 1) {
    return 1
  }
  let result = list[list.length - 1] + 1
  for (let i = 1; i < list.length; i++) {
    if (list[i] - list[i - 1] > 1) {
     
      result = list[i - 1] + 1
      break;
    }
  }
  return result
};


console.log(firstMissingPositive([1,2,3,4,5,6,7,8,9,20]))

var multiply = function (num1, num2) {
  if (num1 === '0' || num2 === '0') {
    return '0'
  }
  const len1 = num1.length

  const len2 = num2.length

  const numStrList = []
  for (let i = len1 - 1; i >= 0; i--) {
    const n1 = num1[i]
    const zeroNum = len1 - 1 - i
    let jw = 0
    let totStr = ''
    for (let j = len2 - 1; j >= 0; j--) {
      const n2 = num2[j]
      let cuVal = j === 0 ? n1 * n2 + jw : (n1 * n2 + jw) % 10
      totStr = cuVal + totStr
    
      jw = Math.floor((n1 * n2 + jw) / 10)
    }
    const total = totStr + '0'.repeat(zeroNum)

    numStrList.push(total)
  }

  const sumLast = numStrList.reduce((total, curr) => {
    let totalLen = total.length
    let currLen = curr.length
    if (totalLen >= currLen) {
      curr = '0'.repeat(totalLen - currLen) + curr
    } else {
      total = '0'.repeat(currLen - totalLen) + total
    }
    let jw = 0
    let result = ''
    for (let i = total.length - 1; i >= 0; i--) {
      const t1 = total[i]
      const c1 = curr[i]
      const sum = Number(t1) + Number(c1)

      let curVal = i === 0 ? (sum + jw) : (sum + jw) % 10
      jw = Math.floor((sum + jw) / 10)
      result = curVal + result
    }
    return result
  }, '')
  return sumLast
};
console.log(multiply("123456789",
  "987654321"))




var isMatch = function (s, p) {

  const sLen = s.length;
  const pLen = p.length;
  // 初始化（包括了一部分base case）
  const dp = new Array(sLen + 1);
  for (let i = 0; i < sLen + 1; i++) {
    dp[i] = new Array(pLen + 1).fill(false);
  }
  console.log([...dp])
  // base case
  dp[0][0] = true;
  for (let j = 1; j <= pLen; j++) {
    dp[0][j] = p[j - 1] == '*' && dp[0][j - 1];
  }
  // 迭代
  for (let i = 1; i <= sLen; i++) {
    for (let j = 1; j <= pLen; j++) {
      if (p[j - 1] == '?' || s[i - 1] == p[j - 1])
        dp[i][j] = dp[i - 1][j - 1];
      else if (p[j - 1] == '*' && (dp[i - 1][j] || dp[i][j - 1]))
        dp[i][j] = true;
    }
  }
  return dp[sLen][pLen]; // 整个s串和整个p串是否匹配
};

console.log(isMatch('acdcb', 'a*c?b'))


var jump = function (nums) {
  let total = 0
  if(nums.length === 1) {
    return 0
  }
  function getIndex(start) {
    let minI = start
    for (let i = start; i >= 0; i--) {
      if (nums[i] >= start - i) {
        if (i <= 0) {
          minI = 0
          break;
        }
        minI = Math.min(minI, i)
      }
    }
    total++
    if (minI > 0) {
      getIndex(minI)
    }
  }
  getIndex(nums.length - 1)
  return total
};

jump([2, 3, 1, 1, 4])


var permute = function (nums) {
  if (nums.length === 1) {
    return [nums]
  }

  if (nums.length === 2) {
    const newRev = [...nums].reverse()
    return [nums, newRev]
  }
  let arr = []
  for (let i = 0; i < nums.length; i++) {
    let newNums = [...nums]
    newNums.splice(i, 1)
    let curr = nums[i]
    let perList = permute(newNums)
    perList.forEach(pl => {
      const newpl = [...pl]
      newpl.unshift(curr)
      arr.push(newpl)
    })

  }

  return arr
};

console.log(permute([1, 2, 3]))

var permuteUnique = function (nums) {
  nums = nums.sort()

  if (nums.length === 1) {
    return [nums]
  }

  if (nums.length === 2) {
    const newRev = [...nums].reverse()
    if(newRev[0] === nums[0]) {
      return [nums]
    }
    return [nums, newRev]
  }
  let arr = []
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === nums[i + 1]) {
      continue
    }
    let newNums = [...nums]
    newNums.splice(i, 1)
    let curr = nums[i]
    let perList = permuteUnique(newNums)
    perList.forEach(pl => {
      const newpl = [...pl]
      newpl.unshift(curr)
      arr.push(newpl)
    })

  }

  return arr
};

console.log(permuteUnique([1, 2, 3]))

var rotate = function (matrix) {
  const len = matrix.length
  matrix.forEach((item, index) => {
    item.reverse()
    matrix[index] = item
  })
  matrix.forEach((item, index) => {
    item.forEach((el, i) => {
      if (i < len - index) {
        let temp = matrix[index][i]
        matrix[index][i] = matrix[len - i - 1][len - 1 - index]
        matrix[len - i - 1][len - 1 - index] = temp
      }
    })
  })
  return matrix
};

console.log(rotate([[1, 2, 3], [4, 5, 6], [7, 8, 9]]))


var groupAnagrams = function (strs) {

  let newStrs = strs.map(str => {
    let sotStr = str.split('').sort().join('')
    return [sotStr, str]
  })

  let obj = {}

  for (let i = 0; i < newStrs.length; i++) {
    const key = newStrs[i][0]
    if(obj[key]) {
      obj[key].push(newStrs[i][1])
    } else {
      obj[key] = [newStrs[i][1]]
    }
  }

  return Object.values(obj)

};

console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))




var myPow = function (x, n) {

  const cache = {}
  function getResult(num) {
    const count = Math.abs(num)
    if (cache[count]) {
      return cache[count]
    }
    const pre = Math.floor(count / 2)
    const next = count - pre


    let result = 0
    if (count == 0) {
      result = 1
    } else if (count == 1) {
      result = x
    } else if (count == 2) {
      result = x * x
    } else {
      result = getResult(pre) * getResult(next)
    }

    cache[count] = result
    return result
  }
  let sum = getResult(n)
  if (n < 0) {
    sum = 1 / sum
  }

  const result = (+sum) * 100000

  

  return Math.round(result) / 100000


};

console.log(myPow(8.88023, 3))

var maxSubArray = function (nums) {
  let pre = 0, maxAns = nums[0];
    nums.forEach((x) => {
        pre = Math.max(pre + x, x);
        maxAns = Math.max(maxAns, pre);
    });
    return maxAns;
}
console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))


var solveNQueens = function (n) {


  function isValid(row, col, chessBoard) {

    for (let i = 0; i < row; i++) {
      if (chessBoard[i][col] === 'Q') {
        return false
      }
    }

    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (chessBoard[i][j] === 'Q') {
        return false
      }
    }

    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (chessBoard[i][j] === 'Q') {
        return false
      }
    }
    return true
  }

  function transformChessBoard(chessBoard) {
    let chessBoardBack = []
    chessBoard.forEach(row => {
      let rowStr = ''
      row.forEach(value => {
        rowStr += value
      })
      chessBoardBack.push(rowStr)
    })

    return chessBoardBack
  }

  let result = []
  function backtracing(row, chessBoard) {
    if (row === n) {
  
      result.push(transformChessBoard(chessBoard))
     
      return
    }
    for (let col = 0; col < n; col++) {
      if (isValid(row, col, chessBoard)) {
        chessBoard[row][col] = 'Q'
        backtracing(row + 1, chessBoard)
        chessBoard[row][col] = '.'
      }
    }
  }
  let chessBoard = new Array(n).fill([]).map(() => new Array(n).fill('.'))
  backtracing(0, chessBoard)
  return result
};
console.log(solveNQueens(4))


var spiralOrder = function (matrix) {
  if (!matrix.length || !matrix[0].length) {
    return [];
}
const rows = matrix.length, columns = matrix[0].length;
const visited = new Array(rows).fill(0).map(() => new Array(columns).fill(false));
const total = rows * columns;
const order = new Array(total).fill(0);

let directionIndex = 0, row = 0, column = 0;
const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
for (let i = 0; i < total; i++) { 
    order[i] = matrix[row][column];
    visited[row][column] = true;
    const nextRow = row + directions[directionIndex][0], nextColumn = column + directions[directionIndex][1];
    if (!(0 <= nextRow && nextRow < rows && 0 <= nextColumn && nextColumn < columns && !(visited[nextRow][nextColumn]))) {
        directionIndex = (directionIndex + 1) % 4;
    }
    row += directions[directionIndex][0];
    column += directions[directionIndex][1];
}
return order;

};

console.log(spiralOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9]]))






var canJump = function (nums) {

  let len = nums.length

  const lenArr = new Array(len)

  for (let i = 0; i < nums.length; i++) {
    for (let j = i; j < nums.length; j++) {
      if (nums[i] > j - i) {
        lenArr[j] = 1
      }
      if(i === nums.length -1) {
        lenArr[j] = 1
      }
    }
  }
  console.log(lenArr)
  const total = lenArr.reduce((prev, curr) => {
    return prev + curr
  }, 0)

  return len === total
};

console.log(canJump([0]))


var merge = function (intervals) {

  let newIntervals = intervals.sort((a, b) => a[0] - b[0])

  let i = 0
  while (i < newIntervals.length) {
    const curr = newIntervals[i]
    if (i + 1 < newIntervals.length) {
      const max = Math.max(curr[0], newIntervals[i + 1][0])
      const min = Math.min(curr[1], newIntervals[i + 1][1])
      if (max <= min) {
        newIntervals[i] = ([Math.min(curr[0], newIntervals[i + 1][0]), Math.max(curr[1], newIntervals[i + 1][1])])
        newIntervals.splice(i + 1, 1)
        i -= 1
      }
    }
    i += 1
  }
  return newIntervals
};

console.log(merge([[1, 4], [0, 2], [3, 5]]))


var insert = function (intervals, newInterval) {
  let newList = intervals.concat([newInterval]).sort((a, b) => a[0] - b[0])

  let res = []

  let prev = newList[0]

  for (let i = 1; i < newList.length; i++) {
    let curr = newList[i]
    if (prev[1] >= curr[0]) {
      prev = [prev[0], Math.max(curr[1], prev[1])]
    } else {
      res.push(prev)
      prev = curr
    }
  }
  res.push(prev)
  return res

};
console.log(insert([[1,5]], [2, 7]))



var lengthOfLastWord = function(s) {
  const arr = s.split(' ').filter(str => !!str);
  
  return arr[arr.length -1].length
};
lengthOfLastWord("Hello World")

var generateMatrix = function (n) {
  const maxNum = n * n;
    let curNum = 1;
    const matrix = new Array(n).fill(0).map(() => new Array(n).fill(0));
    let row = 0, column = 0;
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // 右下左上
    let directionIndex = 0;
    while (curNum <= maxNum) {
      matrix[row][column] = curNum;
      curNum++;
      const nextRow = row + directions[directionIndex][0], nextColumn = column + directions[directionIndex][1];
      if (nextRow < 0 || nextRow >= n || nextColumn < 0 || nextColumn >= n || matrix[nextRow][nextColumn] !== 0) {
          directionIndex = (directionIndex + 1) % 4; // 顺时针旋转至下一个方向
      }
      row = row + directions[directionIndex][0];
      column = column + directions[directionIndex][1];
  }
  return matrix;

};

console.log(generateMatrix(3))


var getPermutation = function (n, k) {
  function factorial(n) {
    if (n <= 1) {
      return 1;
    }
    return factorial(n - 1) * n;
  }
  
  // 出现的所有数字，之后从中取值
  const nums = [...Array(n)].map((vo, i) => i + 1);

  // 结果，应有nums组成，并且不重复
  const re = [];

  let nextK = k;
  for (let i = n; i > 0; i--) {
    // 首字符相同数字的数量
    const factorialN = factorial(i - 1);
    const num = Math.ceil(nextK / factorialN);
    re.push(nums.splice(num - 1, 1));
    nextK = (nextK % factorialN) || factorialN;
  }

  return re.join('');
}

console.log(getPermutation(4, 9))

var uniquePaths = function (m, n) {
  let arr = new Array(m).fill(new Array(n).fill(1))

  arr = arr.map((item, index) => {
    return item.map((el, i) => {
      if (index === 0) {
        return 1
      } else if (i === 0) {
        return 1
      } else {
        return el
      }
    })
  })


  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      arr[i][j] = arr[i - 1][j] + arr[i][j - 1];
    }
  }

 return arr[m-1][n-1]
}

console.log(uniquePaths(3, 7))





var uniquePathsWithObstacles = function (obstacleGrid) {
  const m = obstacleGrid.length
  const n = obstacleGrid[0].length

  let arr = obstacleGrid.map((item, index) => {
    return item.map((el, i) => {
      return 1 - el
    })
  })

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (arr[i][j] !== 0 && !(i == 0 && j === 0)) {
        let ijo = 0
        let jjo = 0
        if (i - 1 >= 0) {
          ijo = arr[i - 1][j]
        }
        if (j - 1 >= 0) {
          jjo = arr[i][j - 1]
        }
        arr[i][j] = ijo + jjo
      }
    }
  }
  return arr[m - 1][n - 1]
}

console.log(uniquePathsWithObstacles([[0, 0], [1, 1], [0, 0]]))


var minPathSum = function (grid) {

  grid.forEach((item, index) => {
     item.forEach((el, i) => {
      let x = 0
      let y = 0
      if (index > 0) {
        x = grid[index - 1][i]
      }
      if (i > 0) {
        y = grid[index][i - 1]
      }

      let sum = (x > y ? y : x)

      if (index === 0 && i === 0) {
        sum = 0
      }
      if (index === 0 && i > 0) {
        sum = y
      }

      if (i === 0 && index > 0) {
        sum = x
      }
      grid[index][i] = el + sum
    })
  })
  
  return grid[grid.length - 1][grid[0].length - 1]

};

console.log(minPathSum([[1, 3, 1], [1, 5, 1], [4, 2, 1]]))


var isNumber = function (s) {
  function isDecimals(str) {
    let test = /^(\+|\-)?(([0-9]+\.[0-9]*)|(\.[0-9]+))$/
    return test.test(str)
  }
  function isInteger(str) {
    let test = /^(\+|\-)?[0-9]+$/
    return test.test(str)
  }
 let index = s.indexOf('e') & s.indexOf('E')

 let result = true

  if(index > -1){
    let s1 = s.substring(0, index)
    let s2 = s.substring(index + 1)
    result = isInteger(s2)

    result = result && (isDecimals(s1) || isInteger(s1))
  } else {
    result = isDecimals(s) || isInteger(s)
  }
 
  return result
};

console.log(isNumber('.'))


var plusOne = function (digits) {
  let jyw = 0
  digits[digits.length - 1]++

  let arr = []
  for (let i = digits.length - 1; i >= 0; i--) {
   
    let oe = digits[i] + jyw
    jyw = Math.floor(oe / 10)
    oe = oe % 10

    arr.unshift(oe)
    if(jyw !==0 && i==0) {
      arr.unshift(jyw)
    }
  }

  return arr
};

console.log(plusOne([9]))



var addBinary = function (a, b) {
  let arr = []
  let jw = 0
  for (let i = a.length - 1, k = b.length - 1; i >= 0 || k >= 0; i--, k--) {
    let x = i < 0 ? 0 : parseInt(a[i])
    let y = k < 0 ? 0 : parseInt(b[k])

    let sum = x + y + jw
    if(sum > 1){
      jw = 1
      sum = sum % 2
    } else {
      jw = 0
    }
    console.log(jw)
    arr.unshift(sum)
   
    if(jw !==0 && ((i==0 && k <= 0) || (i <= 0 && k==0))) {
      arr.unshift(jw)
      break
    }
    
  }
  
  return arr.join('')
}

console.log(addBinary("1111", "1111"))


var mySqrt = function (x) {
  if(x === 0) return 0

  let ans = Math.exp(0.5 * Math.log(x))

  return ans * ans > x ? Math.floor(ans) - 1 : Math.floor(ans)
};

console.log(mySqrt(2))



var climbStairs = function (n) {
  
  let prev = 0
  let next = 0
  let sum = 1;
    for (let i = 1; i <= n; ++i) {
      prev = next;
      next = sum;
      sum = prev + next;
    }
    return sum  ;
};

console.log(climbStairs(4))



var simplifyPath = function (path) {
  const names = path.split("/");
  const stack = [];
  for (const name of names) {
    if (name === "..") {
      if (stack.length) {
        stack.pop();
      }
    } else if (name.length && name !== ".") {
      stack.push(name);

    }
  }

  return "/" + stack.join("/");

};
console.log(simplifyPath("/a/./b///../../c/"))



var minDistance = function (word1, word2) {

  let dp = Array.from(Array(word1.length + 1), () => Array(word2.length+1).fill(0));
  console.log(dp,'===')

    for(let i = 1; i <= word1.length; i++) {
        dp[i][0] = i; 
    }

    for(let j = 1; j <= word2.length; j++) {
        dp[0][j] = j;
    }

    for(let i = 1; i <= word1.length; i++) {
        for(let j = 1; j <= word2.length; j++) {
            if(word1[i-1] === word2[j-1]) {
                dp[i][j] = dp[i-1][j-1];
            } else {
                dp[i][j] = Math.min(dp[i-1][j] + 1, dp[i][j-1] + 1, dp[i-1][j-1] + 1);
            }
        }
    }
    
    return dp[word1.length][word2.length];

};

console.log(minDistance('intention', 'execution'))



var setZeroes = function (matrix) {
  let arr = { x: [], y: [] }
  matrix.forEach((item, i) => {
    item.forEach((el, j) => {
      if (el === 0) {
        arr.x.push(i)
        arr.y.push(j)
      }
    })
  })

  let m = matrix.length
  let n = matrix[0].length

  for (let i = m - 1; i >= 0; i--) {
    for (let j = 0; j < n; j++) {
      if (arr.x.includes(i) || arr.y.includes(j) && matrix[i][j] !== 0) {
        matrix[i][j] = 0
      }
    }
  }



};

let matrix = [[1, 1, 1], [1, 0, 1], [1, 1, 1]]

setZeroes(matrix)

console.log(matrix)


var searchMatrix = function (matrix, target) {
  let m = matrix.length
  let arr = []

  for (let i = 0; i < m; i++) {
    const val = matrix[i][0]
    if (val === target) {
      return true
    }
    if (target > val) {
      arr = matrix[i]
    }
  }

  return arr.includes(target)
};

console.log(searchMatrix([[1], [2, 3]], 3))


var sortColors = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if(nums[i] > nums[j]) {
        const newV = nums[i]
        nums[i] = nums[j]
        nums[j] = newV
      }
    }
  }
};

let arr = [2, 0, 2, 1, 1, 0]

sortColors(arr)





var minWindow = function (s, t) {
  // 需要的
  let need = {};
  // 窗口中的字符
  let win = {};
  for (let a of t) {
    // 统计需要的字符
    need[a] = (need[a] || 0) + 1;
  }
  // 左右指针
  let left = 0,
    right = 0;
  let valid = 0;
  // 最小覆盖子串的起始索引及长度
  let start = 0,
    len = Number.MAX_VALUE;
  while (right < s.length) {
    // 即将移入窗口的字符
    let c = s[right];
    // 右移窗口
    right++;
    if (need[c]) {
      // 当前字符在需要的字符中，则更新当前窗口统计
      win[c] = (win[c] || 0) + 1;
      if (win[c] == need[c]) {
        // 当前窗口和需要的字符匹配时，验证数量增加1
        valid++;
      }
    }
    // 当验证数量与需要的字符个数一致时，就应该收缩窗口了
    while (valid == Object.keys(need).length) {
      // 更新最小覆盖子串
      if (right - left < len) {
        start = left;
        len = right - left;
      }
      //即将移出窗口的字符
      let d = s[left];
      // 左移窗口
      left++;
      if (need[d]) {
        if (win[d] == need[d]) {
          valid--;
        }
        win[d]--;
      }
    }
  }
  return len == Number.MAX_VALUE ? "" : s.substr(start, len);

};

console.log(minWindow("ADOBECODEBANC", 'ABC'))


var combine = function (n, k) {

  const arr = []

  for (let i = 0; i < n; i++) {
    arr.push(i + 1)
  }

  let list = []

  function blist(start, result) {
    if (result.length === k) {
      list.push([...result])
      return false
    }

    for (let i = start; i < arr.length; i++) {
      result.push(arr[i])
      blist(i + 1, result)
      result.pop()
    }

  }
  blist(0, [])

  return list

};

console.log(combine(1, 1))


var subsets = function(nums) {
  if(nums.length === 1) {
    return [[],nums]
  }
  const last = nums.pop()
  let  preList = subsets(nums)
  const newLastList = preList.map(item => {
    return item.concat(last)
  })

  return preList.concat(newLastList)
  
};

console.log(subsets([0]))



var exist = function (board, word) {

  let m = board.length
  let n = board[0].length

  let wordArr = word.split('')

  function isInSort(x, y){
    if(x < 0 || x >= m || y < 0 || y >= n) {
      return false
    }

    
    
    const firtArr = wordArr.shift()
    console.log(firtArr)

    if(wordArr.length == 0 && board[x][y] === firtArr) {
      return true
    }
    
    if(board[x][y] === firtArr) {
      board[x][y] = true
      const firstWord = wordArr[0]
      
      let cacheArr = [...wordArr]
      if( x> 0 && board[x-1][y] === firstWord) {
        const res =  isInSort(x-1, y) 
        if(res) {
          return true
        }
        wordArr = [...cacheArr]

      } 
      if( x < m -1 &&  board[x+1][y] === firstWord) {
        const res =  isInSort(x+1, y)
        if(res) {
          return true
        }
        wordArr = [...cacheArr]
      }
      if( y > 0&&  board[x][y-1] === firstWord) {
        const res =  isInSort(x, y-1)
        if(res) {
          return true
        }
        wordArr = [...cacheArr]
      }
      if( y < n -1 && board[x][y+1] === firstWord) {
        const res =  isInSort(x, y + 1)
        if(res) {
          return true
        }
        wordArr = [...cacheArr]
      }
      board[x][y] = firtArr
      // console.log(wordArr)
      
    }
    firtArr && wordArr.unshift(firtArr)
    return false
  }

  for (let i = 0; i < m; i++) {
    
    for (let j = 0; j < n; j++) {
     if(isInSort( i , j) ){
      return true
     }
    }
  }
  return false

};

console.log(exist([['a']], 'b'))


var removeDuplicates = function (nums) {
  const n = nums.length;
  if (n <= 2) {
    return n;
  }
  let slow = 2,
    fast = 2;
  while (fast < n) {
    if (nums[slow - 2] !== nums[fast]) {
      nums[slow] = nums[fast]
        ++slow;
    }
    ++fast;
  }

  console.log(nums)

  return slow;
};

console.log(removeDuplicates([0, 0, 1, 1, 1, 1, 2, 3, 3]))


var search = function(nums, target) {
 
  let i = 0

  function sortJ(){
    let index = nums.length - 1
    while(index > 0) {
      if(nums[index] === target) {
        return true
      }

      if(nums[index] < nums[index -1]) {
        return false
      }
      index --
      
    }
  }

  let maxIndex = nums.length

  while(i < maxIndex) {
    if(nums[i] === target) {
      return true
    }
    if(nums[i] > target) {
      return sortJ() || false
    } else if(nums[i] < target){
      if(nums[i] > nums[i+1]) {
        return false
      }
      i++
    } else {
      i++
    }
    
  }

  return false
};

console.log(search([4,5,6,7,0,1,2], 8))


var deleteDuplicates = function(head) {
 
  let cur = head

  let dum = head

  while(cur && cur.next) {
   if(cur.val === cur.next.val) {
    let val = cur.next.val
    while(cur.next && cur.next.val === val) {
      cur.next = cur.next.next
    }

   } else {
    cur = cur.next
   }
  }

  return dum
};

let head = [1,1,2,3,3]

let next = null

head.reverse().forEach(item => {
  next = new ListNode(item, next)
})

console.log(deleteDuplicates(next))


var largestRectangleArea = function (heights) {
  let maxArea = 0
  const stack = []
  heights = [0, ...heights, 0]         
  for (let i = 0; i < heights.length; i++) { 
    while (heights[i] < heights[stack[stack.length - 1]]) { // 当前bar比栈顶bar矮
      const stackTopIndex = stack.pop() // 栈顶元素出栈，并保存栈顶bar的索引
      maxArea = Math.max(               // 计算面积，并挑战最大面积
        maxArea,                        // 计算出栈的bar形成的长方形面积
        heights[stackTopIndex] * (i - stack[stack.length - 1] - 1)
      )
    }
    stack.push(i)                       // 当前bar比栈顶bar高了，入栈
  }
  return maxArea

};

console.log(largestRectangleArea([2, 1, 5, 6, 2, 3]))

var partition = function (head, x) {
  let small = new ListNode(0)
  let smallHead = small
  let large = new ListNode(0)
  let largeHead = large

  while (head) {
    if (head.val < x) {
      small.next = head
      small = small.next
     
    } else {
      large.next = head
      large = large.next
      
    }
    head = head.next
  }
  large.next = null
  
  
  small.next = largeHead.next

  return smallHead.next;
};

let head = [1, 4, 3, 2, 5, 2]

let next = null
head.reverse().forEach((v) => {
  next = new ListNode(v, next)
})
console.log(partition(next, 3))


var merge = function(nums1, m, nums2, n) {
  let p1 = m - 1, p2 = n - 1;
    let tail = m + n - 1;
    
    while (p1 >= 0 || p2 >= 0) {
      var cur;
        if (p1 === -1) {
            cur = nums2[p2--];
        } else if (p2 === -1) {
            cur = nums1[p1--];
        } else if (nums1[p1] > nums2[p2]) {
            cur = nums1[p1--];
        } else {
            cur = nums2[p2--];
        }
        nums1[tail--] = cur;
    }
};

let nums1 = [1,2,3,0,0,0]

merge(nums1,3,[2,5,6],3)
console.log(nums1)


var grayCode = function(n) {
  let max = Math.pow(2, n) -1
  let min = 0
  let arr = []

  for(let i = min; i <= max; i++) {
    // console.log(i ^ (i >> 1))
    arr.push(i ^ (i >> 1))
  }

  return arr
};

console.log(grayCode(2))


var subsetsWithDup = function (nums) {


  nums.sort((a, b) => a - b);
  let t = [],
    ans = [];
  const dfs = (choosePre, cur, nums) => {
    if (cur === nums.length) {
      ans.push(t.slice());
      return;
    }
    dfs(false, cur + 1, nums);
    if (!choosePre && cur > 0 && nums[cur - 1] === nums[cur]) {
      return;
    }
    t.push(nums[cur]);
    dfs(true, cur + 1, nums);
    t = t.slice(0, t.length - 1);
  }
  dfs(false, 0, nums);
  return ans;


};

console.log(subsetsWithDup([1, 2, 3]))


// 数字 1-26 并不能以0开头
var numDecodings = function(s) {
  let n = s.length
  let f = new Array(n + 1).fill(0)
 f[0] = 1

 for(let i =1; i<=n; ++i) {
  if(s[i-1] !== '0') {
    f[i] += f[i-1]
  }
  
  if(i > 1 && s[i-2] !== '0' && ((s[i-2]) * 10 + (+s[i-1]) <= 26)) {
    f[i] += f[i-2]
  }
 }

 return f[n]  
};

console.log(numDecodings("12"))
*/

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render( <React.StrictMode >
  <App />
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()