export default {
    "scalars": [
        1,
        3,
        10
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
            "user_roles": [
                3
            ],
            "doctor_profile": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "RoleType": {},
        "DoctorProfileOutput": {
            "experience": [
                5
            ],
            "academic_record": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "DoctorExperienceOutput": {
            "startYear": [
                1
            ],
            "endYear": [
                1
            ],
            "location": [
                1
            ],
            "organization": [
                1
            ],
            "title": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "AcademicRecordOutput": {
            "degree": [
                1
            ],
            "institute": [
                1
            ],
            "year": [
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
                        8,
                        "FindUserInput!"
                    ]
                }
            ],
            "__typename": [
                1
            ]
        },
        "FindUserInput": {
            "email": [
                1
            ],
            "uuid": [
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
                        11,
                        "RegisterInput!"
                    ]
                }
            ],
            "user_login": [
                0,
                {
                    "data": [
                        12,
                        "LoginInput!"
                    ]
                }
            ],
            "user_refresh_token": [
                0,
                {
                    "data": [
                        13,
                        "RefreshLoginInput!"
                    ]
                }
            ],
            "user_logout": [
                10,
                {
                    "data": [
                        14,
                        "LogoutInput!"
                    ]
                }
            ],
            "user_sync_roles": [
                10,
                {
                    "data": [
                        15,
                        "SyncRolesInput!"
                    ]
                }
            ],
            "doctor_sync_profile": [
                10
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
                3
            ],
            "__typename": [
                1
            ]
        }
    }
}