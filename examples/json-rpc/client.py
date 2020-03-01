#!/usr/bin/env python3.7

import json
import requests


def print_result(payload):
    response = requests.post(
        "http://localhost:4000/jsonrpc",
        data=json.dumps(payload),
        headers={'content-type': 'application/json'}
    ).json()
    print("""
    <--- {0}
    ---> {1}\n""".format(payload, response))


def main():
    print("Single Request example:")
    single = {
        "method": "addition",
        "params": [1, 2],
        "jsonrpc": "2.0",
        "id": 1
    }
    print_result(single)

    print("Batch example:")
    batch = [
        {
            "method": "echo",
            "params": ["This is a json-rpc example!"],
            "jsonrpc": "2.0",
            "id": 2
        },
        {
            "method": "today",
            "params": [],
            "jsonrpc": "2.0",
            "id": 3
        },
    ]
    for req in batch:
        print_result(req)

    print("Error example (undefined method):")
    undefined = {
        "method": "some_method",
        "params": ["This must return an error"],
        "jsonrpc": "2.0",
        "id": 4
    }
    print_result(undefined)


if __name__ == "__main__":
    print("--- CLIENT ---")
    main()
