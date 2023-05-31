### API Requirements

#### Structure:

    --> Page
        --> Dashboard (collection of panels)
            --> panels (charts, query, other configs)
            --> variables (key-value pairs used in queries)

#### Pages

Create | Update a page

    ::POST|PATCH:: `/dashboards/pages/create | UPDATE` Create or UPDATE page

```json
    {
      "name": "Account Metrics"
    }
```

Create/Update Panel

    :: POST | PATCH :: `/dashboards/panels/create < or upate >` Create/update panel

```json
  {
    "title": "Another bar chart title",
    "description": "Description here",
    "query": {
      "collection": "transactions",
      "function": {
        "type": "sum",
        "fields": []
      },
      "filters": [
        {
          "field": "",
          "operator": "",
          "value": ""
        }
        //more heare
      ]
    },
    "style": {
      "color_scheme": "color_id",
      "label_colors": {},
      "chart_appearance": {}
      //other configurations
    },
    "type": "bar_chart",
    "size_position": {
      "position": {
        "x": 0,
        "y": 0
      },
      "size": {
        "width": 100,
        "height": 300
      }
    }
  }
```

Return panel details `with results`:

```json
  {
    "id": "iuytre45678",
    "title": "Another bar chart title",
    "description": "Description here",
    "query": {
      "collection": "transactions",
      "function": {
        "type": "sum",
        "fields": []
      },
      "filters": [
        {
          "field": "",
          "operator": "",
          "value": ""
        }
        //more heare
      ]
    },
    "style": {
      "color_scheme": "color_id",
      "label_colors": {},
      "chart_appearance": {}
      //other configurations
    },
    "query_results": [], // actual result json
    "type": "bar_chart",
    "size_position": {
      "position": {
        "x": 0,
        "y": 0
      },
      "size": {
        "width": 100,
        "height": 300
      }
    }
    }
```

Fetch Pages

    ::GET:: `/dashboards/pages` fetch pages

```json
    [
  {
    "name": "Account Metrics",
    "dashboard": {
      "variables": [],
      "panels": [
        {
          "id": "iuytre45678",
          "title": "Another bar chart title",
          "description": "Description here",
          "query": {
            "collection": "transactions",
            "function": {
              "type": "sum",
              "fields": []
            },
            "filters": [
              {
                "field": "",
                "operator": "",
                "value": ""
              }
              //more heare
            ]
          },
          "style": {
            "color_scheme": "color_id",
            "label_colors": {},
            "chart_appearance": {}
            //other configurations
          },
          "query_results": [],
          // actual result json
          "type": "bar_chart",
          "size_position": {
            "position": {
              "x": 0,
              "y": 0
            },
            "size": {
              "width": 100,
              "height": 300
            }
          }
        }
      ]
    }
  }
]
```

#### Deleting a Panel

    ::DELETE:: `/dashboards/panels/<id>` delete panel


#### Deleting a Page

    ::DELETE:: `/dashboards/pages/<id>` delete page

    -> Delete (soft?) dashboard and panels

