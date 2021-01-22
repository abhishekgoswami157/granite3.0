class User < ApplicationRecord
  # has_many :tasks, dependent: :destroy, foreign_key: :user_id
  has_many :tasks, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_secure_password
  has_secure_token :authentication_token
  validates :email, presence: true, uniqueness: true
  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 255 },
    format: { with: VALID_EMAIL_REGEX }, uniqueness: { case_sensitive: false }
  before_save :to_lowercase

  private 
  
  def to_lowercase
    email.downcase
  end


end

