class TasksController < ApplicationController
  # skip_before_action :verify_authenticity_token
  before_action :authenticate_user_using_x_auth_token, except: [:new, :edit]

  before_action :load_task, only: [:show, :update, :destroy]
  def index
    # tasks = Task.all
    tasks = policy_scope(Task)
    pending_tasks = tasks.pending 
    completed_tasks = tasks.completed 
    render status: :ok, json: {tasks: { pending: pending_tasks, completed: completed_tasks }}
  end

  def create
    @task = Task.new(task_params.merge(creator_id: @current_user.id))
    authorize @task
    if @task.save
      render status: :ok, json: { notice: 'Task was successfully created' }
    else
      errors = @task.errors.full_messages
      render status: :unprocessable_entity, json: { errors: errors  }
    end
  end

  def show
    authorize @task
    comments = @task.comments.order("created_at DESC")
    render status: :ok, json: { task: @task, assigned_user: @task.user, comments: comments} #instance variable because we are taking it from some other function
  end

  def update
    authorize @task
    if @task.update(task_params)
      render status: :ok, json: { notice: "Task successfully updated!!"}
    else
      errors = @task.errors.full_messages
      render status: :unprocessable_entity, json: { errors: errors }
    end
  end

  def destroy
    authorize @task
    if @task.destroy
      render status: :ok, json: {notice: "Task successfully deleted!!"}
    else
      render status: :unprocessable_entity, json: { errors: errors }
    end
  end

  private

  def task_params
    params.require(:task).permit(:title, :user_id, :progress)
  end

  def load_task
    @task = Task.find(params[:id])
    # user_id = @task[:user_id]
    # @assigned_user = User.find(user_id)
    rescue ActiveRecord::RecordNotFound => errors
      render json: {errors: errors}, status: :not_found
  end
end

















