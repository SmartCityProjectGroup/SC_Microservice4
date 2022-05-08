const schema = {
    "title": "createPost",
    "description": "Schema for the method posts/createPost",
    "type": "object",
    "properties": {
        "title": {
            "type": "string"
        },
        "short_description": {
            "type": "string"
        },
        "long_description": {
            "type": "string"
        },
        "user_id": {
            "type": "integer"
        },
        "category": {
            "type": "string"
        },
        "category_subject": {
            "type": "string"
        }
    },
    "required": [
        "title",
        "short_description",
        "user_id"
    ]
}

module.exports = schema