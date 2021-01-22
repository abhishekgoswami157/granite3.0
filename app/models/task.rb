class Task < ApplicationRecord
  belongs_to :user
  enum progress: { pending: 0, completed: 1 } #enum allows us to declare an enum atrrivute where the valuew map to integers in the database, but can be queried by name.
  enum status: { unstarred: 0, starred: 1 }
  has_many :comments, dependent: :destroy
  validates :title, presence: true



  private

  def self.organize(progress)
    starred = send(progress).starred.order('updated_at DESC')
    unstarred = send(progress).unstarred
    starred + unstarred
  end

end

