# This is an example worker that the tests use. gem install gearman and run
# gearmand on localhost:4730 to use it.

require 'rubygems'
require 'gearman'

w = Gearman::Worker.new(['localhost:4730'])

w.add_ability('test') do |data, job|
  sleep 1
  job.send_data 'test'
  sleep 1
  job.report_warning 'test'
  sleep 1
  data.reverse
end

loop { w.work }
