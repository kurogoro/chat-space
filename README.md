# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false, unique: true|
|email|string|null: false|
|password|string|null: false|

### Association

- has_many :groups, through: :members
- has_many :messages
- has_many :members


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false, unique: true|

### Association

- has_many :users, through: :members
- has_many :messages
- has_many :members


## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user-id|integer|null: false, foreign_key: true|
|group-id|integer|null: false, foreign_key: true|

### Association

- belongs_to :user
- belongs_to :group


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string|null: true|
|user-id|integer|null: false, foreign_key: true|
|group-id|integer|null: false, foreign_key: true|

### Association

- belongs_to :user
- belongs_to :group
