export default {
    "scalars": [
        1,
        6,
        12
    ],
    "types": {
        "TokenPair": {
            "accessToken": [
                1
            ],
            "refreshToken": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "String": {},
        "UserOutput": {
            "uuid": [
                1
            ],
            "email": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "Query": {
            "sayHello": [
                1
            ],
            "user_find": [
                2,
                {
                    "data": [
                        4,
                        "FindByEmailInput!"
                    ]
                }
            ],
            "__typename": [
                1
            ]
        },
        "FindByEmailInput": {
            "email": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "Mutation": {
            "user_register": [
                2,
                {
                    "data": [
                        7,
                        "RegisterInput!"
                    ]
                }
            ],
            "user_login": [
                0,
                {
                    "data": [
                        8,
                        "LoginInput!"
                    ]
                }
            ],
            "user_refresh_token": [
                0,
                {
                    "data": [
                        9,
                        "RefreshLoginInput!"
                    ]
                }
            ],
            "user_logout": [
                6,
                {
                    "data": [
                        10,
                        "LogoutInput!"
                    ]
                }
            ],
            "user_sync_roles": [
                6,
                {
                    "data": [
                        11,
                        "SyncRolesInput!"
                    ]
                }
            ],
            "__typename": [
                1
            ]
        },
        "Boolean": {},
        "RegisterInput": {
            "email": [
                1
            ],
            "name": [
                1
            ],
            "password": [
                1
            ],
            "birthDate": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "LoginInput": {
            "email": [
                1
            ],
            "password": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "RefreshLoginInput": {
            "refreshToken": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "LogoutInput": {
            "refreshToken": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "SyncRolesInput": {
            "uuid": [
                1
            ],
            "roles": [
                12
            ],
            "__typename": [
                1
            ]
        },
        "RoleType": {}
    }
}