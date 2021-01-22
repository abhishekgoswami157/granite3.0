require "test_helper"

class TaskTest < ActiveSupport::TestCase
  def setup
    @user = User.create!(name: "Sam Smith", email: "sam@example.com", 
    password: 'welcome')
    Task.delete_all
  end

  def test_is_instance_of_task
    task = Task.new
  
    # See if object task actually belongs to Task
    assert task.is_a?(Task)
  end

  def test_value_of_title_assigned
    task = Task.new(title: "Title assigned for testing")

    assert_equal "Title assigned for testing", task.title
  end

  def test_value_created_at
    task = Task.new(title: "This is a test task", user: @user)
    assert_nil task.created_at
  
    task.save!
    assert_not_nil task.created_at
  end

  def test_error_raised
    assert_raises ActiveRecord::RecordNotFound do
      Task.find(SecureRandom.uuid)
    end
  end

  # def test_count_of_number_of_tasks
  #   assert_difference ->{Task.count} do
  #     Task.create!(title: "Creating a task through test")
  #   end
  # end
  
  
end

