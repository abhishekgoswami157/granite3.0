class User < ApplicationRecord
  # has_many :tasks, dependent: :destroy, foreign_key: :user_id
  has_many :tasks, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_secure_password
  has_secure_token :authentication_token
  validates :email, presence: true, uniqueness: true
end

