class Task < ApplicationRecord
  belongs_to :user
  enum progress: { pending: 0, completed: 1 } #enum allows us to declare an enum atrrivute where the valuew map to integers in the database, but can be queried by name.
  has_many :comments, dependent: :destroy
  validates :title, presence: true

end

