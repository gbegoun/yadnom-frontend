export const demo_data = {
  "boards": [
    {
      "_id": "B1001",
      "name": "Demo Yadnom Project Management Tool Development",
      "description": "End-to-end development of our new project management platform with kanban and dashboard capabilities (demo data)",
      "members": [
        201,
        202
      ],
      "created_by": [
        201
      ],
      "created_at": "2025-01-10T08:00:00Z",
      "updated_at": "2025-03-24T17:30:00Z",
      "columns": [
        {
          "_id": "status_column",
          "title": "Status",
          "type": "label",
          "width": "130px",
          "settings": {
            "options": [
              {
                "_id": "done",
                "label": "Done \u2713",
                "color": "#00c875"
              },
              {
                "_id": "working",
                "label": "Working on it",
                "color": "#fdab3d"
              },
              {
                "_id": "stuck",
                "label": "Stuck",
                "color": "#df2f4a"
              },
              {
                "_id": "planning",
                "label": "Planning",
                "color": "#66ccff"
              },
              {
                "_id": "testing",
                "label": "Testing",
                "color": "#9d50dd"
              }
            ]
          }
        },
        {
          "_id": "sprint_column",
          "title": "Sprint",
          "type": "dropdown",
          "settings": {
            "options": [
              {
                "_id": "sprint1",
                "label": "Sprint 1"
              },
              {
                "_id": "sprint2",
                "label": "Sprint 2"
              },
              {
                "_id": "sprint3",
                "label": "Sprint 3"
              },
              {
                "_id": "sprint4",
                "label": "Sprint 4"
              },
              {
                "_id": "backlog",
                "label": "Backlog"
              }
            ]
          }
        },
        {
          "_id": "owners_column",
          "title": "Owners",
          "type": "people",
          "settings": {
            "allow_multiple": true
          }
        },
        {
          "_id": "priority_column",
          "title": "Priority",
          "type": "label",
          "settings": {
            "options": [
              {
                "_id": "critical",
                "label": "Critical \u26a0\ufe0f",
                "color": "#333333"
              },
              {
                "_id": "high",
                "label": "High",
                "color": "#401694"
              },
              {
                "_id": "medium",
                "label": "Medium",
                "color": "#5559df"
              },
              {
                "_id": "low",
                "label": "Low",
                "color": "#00c875"
              }
            ]
          }
        },
        {
          "_id": "due_date_column",
          "title": "Due Date",
          "type": "date",
          "settings": {
            "include_time": false
          }
        },
        {
          "_id": "files_column",
          "title": "Files",
          "type": "file",
          "settings": {}
        },
        {
          "_id": "progress_column",
          "title": "Progress",
          "type": "progress",
          "settings": {}
        }
      ],
      "groups": [
        {
          "_id": "grp_ui_design",
          "title": "UI/UX Design",
          "color": "#ff007f",
          "archived": false,
          "tasks": []
        },
        {
          "_id": "grp_frontend",
          "title": "Frontend Development",
          "color": "#fdab3d",
          "archived": false,
          "tasks": []
        },
        {
          "_id": "grp_backend",
          "title": "Backend Development",
          "color": "#00c875",
          "archived": false,
          "tasks": []
        },
        {
          "_id": "grp_testing",
          "title": "Testing & QA",
          "color": "#9d50dd",
          "archived": false,
          "tasks": []
        },
        {
          "_id": "grp_deployment",
          "title": "DevOps & Infrastructure",
          "color": "#df2f4a",
          "archived": false,
          "tasks": []
        }
      ],
      "tasks": [
        {
          "_id": 6001,
          "title": "User research & interviews",
          "created_at": "2025-01-12T09:00:00Z",
          "updated_at": "2025-01-22T15:30:00Z",
          "creator_id": 204,
          "column_values": {
            "status_column": "done",
            "sprint_column": "sprint1",
            "owners_column": [
              204
            ],
            "due_date_column": "2025-01-22",
            "files_column": [
              "user_research_findings.pdf"
            ],
            "progress_column": 100
          },
          "groupid": "grp_ui_design"
        },
        {
          "_id": 6002,
          "title": "Create design system",
          "created_at": "2025-01-15T10:15:00Z",
          "updated_at": "2025-02-05T11:45:00Z",
          "creator_id": 204,
          "column_values": {
            "status_column": "done",
            "sprint_column": "sprint1",
            "owners_column": [
              204
            ],
            "priority_column": "high",
            "due_date_column": "2025-02-05",
            "files_column": [
              "design_system_v1.fig"
            ],
            "progress_column": 100
          },
          "groupid": "grp_ui_design"
        },
        {
          "_id": 6003,
          "title": "Create board view wireframes",
          "created_at": "2025-01-25T13:10:00Z",
          "updated_at": "2025-02-10T16:20:00Z",
          "creator_id": 204,
          "column_values": {
            "status_column": "done",
            "sprint_column": "sprint2",
            "owners_column": [
              204
            ],
            "priority_column": "high",
            "due_date_column": "2025-02-10",
            "files_column": [
              "board_view_wireframes.fig"
            ],
            "progress_column": 100
          },
          "groupid": "grp_ui_design"
        },
        {
          "_id": 6004,
          "title": "Design dashboard UI",
          "created_at": "2025-02-08T09:00:00Z",
          "updated_at": "2025-02-20T14:30:00Z",
          "creator_id": 204,
          "column_values": {
            "status_column": "done",
            "sprint_column": "sprint2",
            "owners_column": [
              204
            ],
            "priority_column": "medium",
            "due_date_column": "2025-02-20",
            "files_column": [
              "dashboard_ui_v1.fig",
              "dashboard_components.png"
            ],
            "progress_column": 100
          },
          "groupid": "grp_ui_design"
        },
        {
          "_id": 6005,
          "title": "Create interactive prototypes",
          "created_at": "2025-02-15T11:00:00Z",
          "updated_at": "2025-03-01T13:15:00Z",
          "creator_id": 204,
          "column_values": {
            "status_column": "done",
            "sprint_column": "sprint3",
            "owners_column": [
              204
            ],
            "priority_column": "medium",
            "due_date_column": "2025-03-01",
            "files_column": [
              "interactive_prototype_v1.fig"
            ],
            "progress_column": 100
          },
          "groupid": "grp_ui_design"
        },
        {
          "_id": 6006,
          "title": "Design notification system UI",
          "created_at": "2025-03-05T10:00:00Z",
          "updated_at": "2025-03-18T16:20:00Z",
          "creator_id": 204,
          "column_values": {
            "status_column": "working",
            "sprint_column": "sprint4",
            "owners_column": [
              204
            ],
            "priority_column": "medium",
            "due_date_column": "2025-03-25",
            "files_column": [
              "notifications_draft.fig"
            ],
            "progress_column": 75
          },
          "groupid": "grp_ui_design"
        },
        {
          "_id": 6007,
          "title": "Set up React project structure",
          "created_at": "2025-01-20T09:30:00Z",
          "updated_at": "2025-01-25T14:15:00Z",
          "creator_id": 203,
          "column_values": {
            "status_column": "done",
            "sprint_column": "sprint1",
            "owners_column": [
              203
            ],
            "priority_column": "high",
            "due_date_column": "2025-01-25",
            "files_column": [],
            "progress_column": 100
          },
          "groupid": "grp_frontend"
        },
        {
          "_id": 6008,
          "title": "Implement component library",
          "created_at": "2025-01-26T08:45:00Z",
          "updated_at": "2025-02-15T11:10:00Z",
          "creator_id": 203,
          "column_values": {
            "status_column": "done",
            "sprint_column": "sprint2",
            "owners_column": [
              203
            ],
            "priority_column": "high",
            "due_date_column": "2025-02-15",
            "files_column": [],
            "progress_column": 100
          },
          "groupid": "grp_frontend"
        },
        {
          "_id": 6009,
          "title": "Build board view components",
          "created_at": "2025-02-10T13:20:00Z",
          "updated_at": "2025-02-28T15:45:00Z",
          "creator_id": 203,
          "column_values": {
            "status_column": "done",
            "sprint_column": "sprint2",
            "owners_column": [
              203
            ],
            "priority_column": "high",
            "due_date_column": "2025-02-28",
            "files_column": [],
            "progress_column": 100
          },
          "groupid": "grp_frontend"
        },
        {
          "_id": 6010,
          "title": "Implement drag and drop functionality",
          "created_at": "2025-02-20T09:15:00Z",
          "updated_at": "2025-03-10T11:30:00Z",
          "creator_id": 203,
          "column_values": {
            "status_column": "testing",
            "sprint_column": "sprint3",
            "owners_column": [
              203
            ],
            "priority_column": "high",
            "due_date_column": "2025-03-10",
            "files_column": [],
            "progress_column": 90
          },
          "groupid": "grp_frontend"
        },
        {
          "_id": 6011,
          "title": "Create dashboard widgets",
          "created_at": "2025-03-01T11:15:00Z",
          "updated_at": "2025-03-15T14:30:00Z",
          "creator_id": 203,
          "column_values": {
            "status_column": "working",
            "sprint_column": "sprint3",
            "owners_column": [
              203
            ],
            "priority_column": "medium",
            "due_date_column": "2025-03-20",
            "files_column": [],
            "progress_column": 65
          },
          "groupid": "grp_frontend"
        },
        {
          "_id": 6012,
          "title": "Implement responsive layouts",
          "created_at": "2025-03-10T09:30:00Z",
          "updated_at": "2025-03-22T13:20:00Z",
          "creator_id": 203,
          "column_values": {
            "status_column": "stuck",
            "sprint_column": "sprint4",
            "owners_column": [
              203
            ],
            "priority_column": "medium",
            "due_date_column": "2025-03-25",
            "files_column": [],
            "progress_column": 30
          },
          "groupid": "grp_frontend"
        },
        {
          "_id": 6013,
          "title": "Design database schema",
          "created_at": "2025-01-15T09:00:00Z",
          "updated_at": "2025-01-28T14:30:00Z",
          "creator_id": 202,
          "column_values": {
            "status_column": "done",
            "sprint_column": "sprint1",
            "owners_column": [
              202
            ],
            "priority_column": "critical",
            "due_date_column": "2025-01-28",
            "files_column": [
              "database_schema_v1.pdf"
            ],
            "progress_column": 100
          },
          "groupid": "grp_backend"
        },
        {
          "_id": 6014,
          "title": "Set up API structure",
          "created_at": "2025-01-25T10:00:00Z",
          "updated_at": "2025-02-05T13:20:00Z",
          "creator_id": 202,
          "column_values": {
            "status_column": "done",
            "sprint_column": "sprint1",
            "owners_column": [
              202
            ],
            "priority_column": "high",
            "due_date_column": "2025-02-05",
            "files_column": [
              "api_docs_v1.pdf"
            ],
            "progress_column": 100
          },
          "groupid": "grp_backend"
        },
        {
          "_id": 6015,
          "title": "Implement authentication system",
          "created_at": "2025-02-01T09:30:00Z",
          "updated_at": "2025-02-15T15:40:00Z",
          "creator_id": 202,
          "column_values": {
            "status_column": "done",
            "sprint_column": "sprint2",
            "owners_column": [
              202,
              206
            ],
            "priority_column": "critical",
            "due_date_column": "2025-02-15",
            "files_column": [],
            "progress_column": 100
          },
          "groupid": "grp_backend"
        },
        {
          "_id": 6016,
          "title": "Build board CRUD endpoints",
          "created_at": "2025-02-10T11:15:00Z",
          "updated_at": "2025-02-25T15:45:00Z",
          "creator_id": 202,
          "column_values": {
            "status_column": "done",
            "sprint_column": "sprint2",
            "owners_column": [
              202
            ],
            "priority_column": "high",
            "due_date_column": "2025-02-25",
            "files_column": [],
            "progress_column": 100
          },
          "groupid": "grp_backend"
        },
        {
          "_id": 6017,
          "title": "Implement real-time updates",
          "created_at": "2025-02-20T10:00:00Z",
          "updated_at": "2025-03-10T14:15:00Z",
          "creator_id": 202,
          "column_values": {
            "status_column": "working",
            "sprint_column": "sprint3",
            "owners_column": [
              202,
              206
            ],
            "priority_column": "high",
            "due_date_column": "2025-03-15",
            "files_column": [],
            "progress_column": 75
          },
          "groupid": "grp_backend"
        },
        {
          "_id": 6018,
          "title": "Create activity logging system",
          "created_at": "2025-03-01T09:15:00Z",
          "updated_at": "2025-03-12T11:30:00Z",
          "creator_id": 206,
          "column_values": {
            "status_column": "working",
            "sprint_column": "sprint3",
            "owners_column": [
              206
            ],
            "priority_column": "medium",
            "due_date_column": "2025-03-20",
            "files_column": [],
            "progress_column": 60
          },
          "groupid": "grp_backend"
        },
        {
          "_id": 6019,
          "title": "Implement notification service",
          "created_at": "2025-03-05T11:30:00Z",
          "updated_at": "2025-03-20T15:40:00Z",
          "creator_id": 206,
          "column_values": {
            "status_column": "planning",
            "sprint_column": "sprint4",
            "owners_column": [
              206
            ],
            "priority_column": "medium",
            "due_date_column": "2025-04-05",
            "files_column": [],
            "progress_column": 15
          },
          "groupid": "grp_backend"
        },
        {
          "_id": 6020,
          "title": "Create test plan",
          "created_at": "2025-01-20T09:00:00Z",
          "updated_at": "2025-02-01T14:30:00Z",
          "creator_id": 205,
          "column_values": {
            "status_column": "done",
            "sprint_column": "sprint1",
            "owners_column": [
              205
            ],
            "priority_column": "high",
            "due_date_column": "2025-02-01",
            "files_column": [
              "test_plan_v1.pdf"
            ],
            "progress_column": 100
          },
          "groupid": "grp_testing"
        },
        {
          "_id": 6021,
          "title": "Write unit tests for component library",
          "created_at": "2025-02-15T10:00:00Z",
          "updated_at": "2025-02-25T13:15:00Z",
          "creator_id": 205,
          "column_values": {
            "status_column": "done",
            "sprint_column": "sprint2",
            "owners_column": [
              205,
              203
            ],
            "priority_column": "medium",
            "due_date_column": "2025-02-25",
            "files_column": [],
            "progress_column": 100
          },
          "groupid": "grp_testing"
        },
        {
          "_id": 6022,
          "title": "Test authentication workflows",
          "created_at": "2025-02-16T09:30:00Z",
          "updated_at": "2025-02-23T13:15:00Z",
          "creator_id": 205,
          "column_values": {
            "status_column": "done",
            "sprint_column": "sprint2",
            "owners_column": [
              205
            ],
            "priority_column": "high",
            "due_date_column": "2025-02-23",
            "files_column": [
              "auth_test_report.pdf"
            ],
            "progress_column": 100
          },
          "groupid": "grp_testing"
        },
        {
          "_id": 6023,
          "title": "Integration testing for board view",
          "created_at": "2025-03-01T11:15:00Z",
          "updated_at": "2025-03-12T16:30:00Z",
          "creator_id": 205,
          "column_values": {
            "status_column": "testing",
            "sprint_column": "sprint3",
            "owners_column": [
              205
            ],
            "priority_column": "high",
            "due_date_column": "2025-03-15",
            "files_column": [],
            "progress_column": 80
          },
          "groupid": "grp_testing"
        },
        {
          "_id": 6024,
          "title": "Performance testing",
          "created_at": "2025-03-05T10:30:00Z",
          "updated_at": "2025-03-18T15:15:00Z",
          "creator_id": 205,
          "column_values": {
            "status_column": "planning",
            "sprint_column": "sprint4",
            "owners_column": [
              205
            ],
            "priority_column": "medium",
            "due_date_column": "2025-04-01",
            "files_column": [],
            "progress_column": 10
          },
          "groupid": "grp_testing"
        },
        {
          "_id": 6025,
          "title": "Set up CI/CD pipeline",
          "created_at": "2025-01-18T09:15:00Z",
          "updated_at": "2025-01-30T13:30:00Z",
          "creator_id": 207,
          "column_values": {
            "status_column": "done",
            "sprint_column": "sprint1",
            "owners_column": [
              207
            ],
            "priority_column": "high",
            "due_date_column": "2025-01-30",
            "files_column": [
              "cicd_workflow_docs.pdf"
            ],
            "progress_column": 100
          },
          "groupid": "grp_deployment"
        },
        {
          "_id": 6026,
          "title": "Configure staging environment",
          "created_at": "2025-02-01T10:00:00Z",
          "updated_at": "2025-02-12T15:30:00Z",
          "creator_id": 207,
          "column_values": {
            "status_column": "done",
            "sprint_column": "sprint2",
            "owners_column": [
              207
            ],
            "priority_column": "high",
            "due_date_column": "2025-02-12",
            "files_column": [],
            "progress_column": 100
          },
          "groupid": "grp_deployment"
        },
        {
          "_id": 6027,
          "title": "Set up monitoring and alerts",
          "created_at": "2025-02-15T11:30:00Z",
          "updated_at": "2025-03-01T14:15:00Z",
          "creator_id": 207,
          "column_values": {
            "status_column": "done",
            "sprint_column": "sprint3",
            "owners_column": [
              207
            ],
            "priority_column": "medium",
            "due_date_column": "2025-03-01",
            "files_column": [
              "monitoring_stack.pdf"
            ],
            "progress_column": 100
          },
          "groupid": "grp_deployment"
        },
        {
          "_id": 6028,
          "title": "Database scaling strategy",
          "created_at": "2025-03-02T09:30:00Z",
          "updated_at": "2025-03-20T13:45:00Z",
          "creator_id": 207,
          "column_values": {
            "status_column": "working",
            "sprint_column": "sprint4",
            "owners_column": [
              207,
              202
            ],
            "priority_column": "medium",
            "due_date_column": "2025-04-01",
            "files_column": [
              "db_scaling_draft.pdf"
            ],
            "progress_column": 45
          },
          "groupid": "grp_deployment"
        }
      ]
    }
  ]
}