# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_08_07_155340) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "draft_classes", force: :cascade do |t|
    t.bigint "pool_id"
    t.bigint "game_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["game_id"], name: "index_draft_classes_on_game_id"
    t.index ["pool_id"], name: "index_draft_classes_on_pool_id"
  end

  create_table "games", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "round", default: "1"
    t.integer "current_player", default: 0
  end

  create_table "gameselections", force: :cascade do |t|
    t.bigint "game_id"
    t.bigint "selection_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["game_id"], name: "index_gameselections_on_game_id"
    t.index ["selection_id"], name: "index_gameselections_on_selection_id"
  end

  create_table "pools", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "selections", force: :cascade do |t|
    t.string "name", null: false
    t.string "description", null: false
    t.string "image", null: false
    t.bigint "pool_id"
    t.bigint "draft_class_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["draft_class_id"], name: "index_selections_on_draft_class_id"
    t.index ["pool_id"], name: "index_selections_on_pool_id"
  end

  create_table "teams", force: :cascade do |t|
    t.string "name"
    t.bigint "game_id"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["game_id"], name: "index_teams_on_game_id"
    t.index ["user_id"], name: "index_teams_on_user_id"
  end

  create_table "teamselections", force: :cascade do |t|
    t.bigint "team_id"
    t.bigint "selection_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["selection_id"], name: "index_teamselections_on_selection_id"
    t.index ["team_id"], name: "index_teamselections_on_team_id"
  end

  create_table "usergames", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "game_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["game_id"], name: "index_usergames_on_game_id"
    t.index ["user_id"], name: "index_usergames_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "votes", id: :serial, force: :cascade do |t|
    t.string "votable_type"
    t.integer "votable_id"
    t.string "voter_type"
    t.integer "voter_id"
    t.boolean "vote_flag"
    t.string "vote_scope"
    t.integer "vote_weight"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["votable_id", "votable_type", "vote_scope"], name: "index_votes_on_votable_id_and_votable_type_and_vote_scope"
    t.index ["voter_id", "voter_type", "vote_scope"], name: "index_votes_on_voter_id_and_voter_type_and_vote_scope"
  end

end
