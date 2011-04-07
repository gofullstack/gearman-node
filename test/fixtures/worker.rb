# This is an example worker that the tests use. gem install gearman and run
# gearmand on localhost:4730 to use it.

require 'rubygems'
require 'gearman'

t = Thread.new {
  w = Gearman::Worker.new(['localhost:4730'])

  w.add_ability('test') do |data, job|
    data.reverse
  end

  loop { w.work }
}.join
