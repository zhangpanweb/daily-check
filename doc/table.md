## table

#### user

| Column | datatypes |        |
| ------ | --------- | ------ |
| id     |           | 主键id |
| name   | string    | 用户名 |
|        |           |        |
|        |           |        |

#### check-item

|              |         |                      |
| ------------ | ------- | -------------------- |
|              |         | 主键id               |
| ownerId      |         | 拥有者用户id         |
| name         | string  | 打卡项名称           |
| description  | string  | 打卡项描述           |
| journal_must | boolean | 打卡是否日志是否必填 |
|              |         |                      |
|              |         |                      |

#### user-check-item

| column      | datatypes | description |
| ----------- | --------- | ----------- |
| id          | int       | 主键id      |
| ownerId     | int       | 用户id      |
| checkItemId | int       | 打卡项id    |
|             |           |             |

#### check-record

| column      | datatypes | description |
| ----------- | --------- | ----------- |
| id          | int       | 主键id      |
| ownerId     | int       | 用户id      |
| checkItemId | int       | 打卡项id    |
| date        | date      | 日期        |
| journal     | string    | 打卡日志    |

