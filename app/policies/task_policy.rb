#Class has the same name as that of model class whose authorization we want to check prefixed by Policy
#The first argument is user. Pundit will call current_user method which we had defined in application Controller, to retrieve what to send into this argument.
# The second argument is that of a model object, whose authorization you want to check.
# The other methods will map to the name of a particular controller action.

class TaskPolicy
  attr_reader :user, :task

  def initialize(user, task)
    @user = user
    @task = task
  end

  # The show policy check is invoked when we call `authorize @task`
  # from the show action of tasks controller.
  # Here the condition we want to check is that
  # whether the record's creator is current user or record is assigned to the current user.
  def show?
    task.creator_id == user.id || task.user_id == user.id
  end

  # The condition for edit policy is the same as that of the show.
  # Hence, we can simply call `show?` inside the edit? policy here.
  def edit?
    show?
  end

  # Similar in the case for update? policy.
  def update?
    show?
  end

  # Every user can create a task, hence create? will always returns true.
  def create?
    true
  end

  # Only the user that has created the task, can delete it.
  def destroy?
    task.creator_id == user.id
  end

  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      scope.where(creator_id: user.id).or(scope.where(user_id: user.id))
    end
  end
  
end

