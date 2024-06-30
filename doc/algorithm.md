# خورزمية التطبيق

## الاجزاء للخورزمية
```yaml
dataStorage
    task
        def || schema
            id?: new Date().getTime() + Math.random().toString(9)
            idLocal?: @id
            title?: ""
            about?: ""
            complete?: false
            timeComplete?: 1500 # 25 * 60
            totleTime?: 0
            idGroup?: TaskGroup.id
    TaskGroup
        def || schema 
            id?: new Date().getTime() + Math.random().toString(9)
            idLocal?: @id
            title: ""
dataState
    global
        TaskOne: {}, 
        TaskList: [], 
        isRunning: false
    
```

