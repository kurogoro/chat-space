require 'carrierwave/storage/abstract'
require 'carrierwave/storage/file'
require 'carrierwave/storage/fog'

CarrierWave.configure do |config|
  config.storage = :fog
  config.fog_provider = 'fog/aws'
  puts "test"
  config.fog_credentials = {
    provider: 'AWS',
    aws_access_key_id: Rails.application.secrets.aws_access_key_id,
    aws_secret_access_key: Rails.application.secrets.aws_secret_access_key,
    region: 'ap-northeast-1'
  }
  puts "#{config.fog_credentials.aws_access_key_id}"
  puts "#{config.fog_credentials.aws_secret_access_key}"

  config.fog_directory  = 'kurogoro-bucket'
  config.asset_host = 'https://s3-ap-northeast-1.amazonaws.com/kurogoro-bucket'
end