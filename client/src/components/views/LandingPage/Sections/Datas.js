const continents = [
    {
        "_id": 1,
        "name": "곡류"
    },
    {
        "_id": 2,
        "name": "콩류"
    },
    {
        "_id": 3,
        "name": "구근류"
    },
    {
        "_id": 4,
        "name": "채소"
    },
    {
        "_id": 5,
        "name": "과실류"
    },
    {
        "_id": 6,
        "name": "종실류"
    },
    {
        "_id": 7,
        "name": "버섯류"
    }

]

const price = [
    {
        "_id": 0,
        "name": "Any",
        "array": []
    },
    {
        "_id": 1,
        "name": "5000원 미만",
        "array": [0, 4999]
    },
    {
        "_id": 2,
        "name": "만원 미만",
        "array": [5000, 9999]
    },
    {
        "_id": 3,
        "name": "3만원 미만",
        "array": [10000, 29999]
    },
    {
        "_id": 4,
        "name": "5만원 미만",
        "array": [30000, 49999]
    },
    {
        "_id": 5,
        "name": "5만원 이상",
        "array": [50000, 5000000]
    }
]




export {
    continents,
    price
}
