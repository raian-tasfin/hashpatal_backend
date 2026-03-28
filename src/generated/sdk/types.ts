export default {
    "scalars": [
        1,
        3,
        9,
        11,
        13,
        28,
        31
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
            "schedule": [
                8
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
        "DepartmentOutput": {
            "uuid": [
                1
            ],
            "name": [
                1
            ],
            "doctors": [
                2
            ],
            "__typename": [
                1
            ]
        },
        "ScheduleOutput": {
            "uuid": [
                1
            ],
            "minutes_per_slot": [
                9
            ],
            "max_booking_days": [
                9
            ],
            "available_slots": [
                10,
                {
                    "date": [
                        1,
                        "String!"
                    ]
                }
            ],
            "available_shifts": [
                12
            ],
            "__typename": [
                1
            ]
        },
        "Int": {},
        "AvailableSlotOutput": {
            "shift": [
                11
            ],
            "startTime": [
                1
            ],
            "endTime": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ShiftType": {},
        "AvailableShiftOutput": {
            "date": [
                1
            ],
            "shift": [
                11
            ],
            "status": [
                13
            ],
            "__typename": [
                1
            ]
        },
        "Boolean": {},
        "Query": {
            "sayHello": [
                1
            ],
            "user_find": [
                2,
                {
                    "data": [
                        15,
                        "FindUserInput!"
                    ]
                }
            ],
            "department_fetch_all": [
                7
            ],
            "department_find": [
                7,
                {
                    "data": [
                        16,
                        "FindDepartmentInput!"
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
        "FindDepartmentInput": {
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
                        18,
                        "RegisterInput!"
                    ]
                }
            ],
            "user_login": [
                0,
                {
                    "data": [
                        19,
                        "LoginInput!"
                    ]
                }
            ],
            "user_refresh_token": [
                0,
                {
                    "data": [
                        20,
                        "RefreshLoginInput!"
                    ]
                }
            ],
            "user_logout": [
                13,
                {
                    "data": [
                        21,
                        "LogoutInput!"
                    ]
                }
            ],
            "user_sync_roles": [
                13,
                {
                    "data": [
                        22,
                        "SyncRolesInput!"
                    ]
                }
            ],
            "doctor_sync_profile": [
                13,
                {
                    "data": [
                        23,
                        "SyncProfileInput!"
                    ]
                }
            ],
            "department_add": [
                13,
                {
                    "data": [
                        26,
                        "AddDepartmentInput!"
                    ]
                }
            ],
            "schedule_sync": [
                13,
                {
                    "data": [
                        27,
                        "ScheduleSyncInput!"
                    ]
                }
            ],
            "routine_sync": [
                13,
                {
                    "data": [
                        29,
                        "RoutineSyncInput!"
                    ]
                }
            ],
            "__typename": [
                1
            ]
        },
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
        },
        "SyncProfileInput": {
            "uuid": [
                1
            ],
            "departmentUuid": [
                1
            ],
            "experience": [
                24
            ],
            "academic": [
                25
            ],
            "__typename": [
                1
            ]
        },
        "ExperienceInput": {
            "title": [
                1
            ],
            "organization": [
                1
            ],
            "location": [
                1
            ],
            "startYear": [
                1
            ],
            "endYear": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "AcademicRecordInput": {
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
        "AddDepartmentInput": {
            "name": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ScheduleSyncInput": {
            "entityUuid": [
                1
            ],
            "schedulable": [
                28
            ],
            "minutes_per_slot": [
                9
            ],
            "max_booking_days": [
                9
            ],
            "__typename": [
                1
            ]
        },
        "SchedulableType": {},
        "RoutineSyncInput": {
            "entityUuid": [
                1
            ],
            "schedulable": [
                28
            ],
            "slots": [
                30
            ],
            "__typename": [
                1
            ]
        },
        "RoutineSlotInput": {
            "shift": [
                11
            ],
            "startTime": [
                1
            ],
            "endTime": [
                1
            ],
            "weekDay": [
                31
            ],
            "__typename": [
                1
            ]
        },
        "WeekDayType": {}
    }
}