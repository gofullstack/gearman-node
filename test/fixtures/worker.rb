# This is an example worker that the tests use. `gem install gearman` and run
# `gearmand` on localhost:4730 to use it.

require 'rubygems'
require 'gearman'

w = Gearman::Worker.new(['localhost:4730'])

w.add_ability('test') do |data, job|
  sleep 0.25
  job.send_data 'test'
  sleep 0.25
  job.report_warning 'test'
  sleep 0.25
  data.reverse
end

w.add_ability('test_fail') do
  sleep 0.25
  false
end

loop { w.work }
