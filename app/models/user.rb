class User < ApplicationRecord
  has_many :tasks, dependent: :destroy, foreign_key: :user_id
  has_secure_password
  validates :email, presence: true, uniqueness: true
end

