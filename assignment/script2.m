%-------------opposition data analysis -------------------------------------

data_opp = importdata('01_data_mars_opposition.csv',',',1);

len = 12;

theta       = zeros(12,1);
geo_phi     = zeros(12,1);
helio_phi   = zeros(12,1);

for i = 1:len
  geo_phi(i)   = data_opp.data(i,8) + (data_opp.data(i,9)/60);
end

for i = 1:len
  helio_phi(i) = 0;
end
