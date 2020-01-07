require "sinatra"
require "sinatra/json"
require "json"
require "sinatra/reloader" if development?
require "pry" if development? || test?

set :bind, '0.0.0.0'  # bind to all interfaces
set :public_folder, File.join(File.dirname(__FILE__), "public")

CURRENT_FILE_PATH = File.dirname(__FILE__)

def read_questions
  JSON.parse(File.read("questions.json"))
end

def read_launchers
  JSON.parse(File.read("launchers.json"))
end

before do
  headers({ "Access-Control-Allow-Origin" => "*" })
end

get "/" do
  erb :home
end

get "/api/v1/launcher/:id" do
  launcher = read_launchers

  launcher = launcher.find do |launcher|
    launcher["id"] == params[:id].to_i
  end

  content_type :json
  json launcher
end


get "/api/v1/launchers" do
  # required for step three
  launchers = read_launchers

  content_type :json
  json launchers
end

get "/api/v1/questions" do
  questions = read_questions
  content_type :json
  json questions
end

post "/api/v1/questions" do
  current_questions = read_questions

  question = JSON.parse(request.body.read)
  question["id"] = current_questions.last["id"] + 1

  current_questions << question
  File.write("questions.json", JSON.pretty_generate(current_questions))

  content_type :json
  status 201
  json question
end

# If the path does not match any of the above routes, render the erb page.
get "*" do
  erb :home
end
