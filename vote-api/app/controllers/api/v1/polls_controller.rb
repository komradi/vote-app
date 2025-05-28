class Api::V1::PollsController < ApplicationController
  def index
    render json: Poll.all, include: :votes
  end

  def show
    poll = Poll.find(params[:id])
    render json: poll, include: :votes
  end

  def create
    poll = Poll.new(title: params[:title], options: params[:options])
    if poll.save
      render json: poll, status: :created
    else
      render json: { errors: poll.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    poll = Poll.find(params[:id])
    if poll.update(title: params[:title], options: params[:options])
      render json: poll
    else
      render json: { errors: poll.errors.full_messages }, status: :unprocessable_entity
    end
  end
end