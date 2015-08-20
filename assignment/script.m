%-------------triagulation data analysis -------------------------------------

data_tri = importdata('01_data_mars_triangulation.csv',',',1);

% theta => heliocentric longitude of earth

theta_deg = data_tri.data(:, 5);
theta_min = data_tri.data(:, 6);
theta     = theta_deg + theta_min/60;

% phi => geocentric longitude of mars

phi_deg = data_tri.data(:, 7);
phi_min = data_tri.data(:, 8);
phi     = phi_deg + phi_min/60;

sin_theta = sind(theta); % sine
cos_theta = cosd(theta); % cosine
m         = tand(phi);   % slope of line joining earth and mars

% calculating the locations of the five different porjections of Mars on the
% elciptic plane.

x_mars = zeros(5,1);
y_mars = zeros(5,1);

for i = 1:5
  indx      = 2*(i-1) + 1;
  x_mars(i,1) = (sin_theta(indx+1) - sin_theta(indx)) + (m(indx)*cos_theta(indx) - m(indx+1)*cos_theta(indx+1));
  x_mars(i,1) = x_mars(i)/(m(indx) - m(indx+1));

  y_mars(i,1)    = m(indx)*x_mars(i,1) + sin_theta(indx) - (m(indx)*cos_theta(indx));
end

x_sqr = x_mars .^2;
y_sqr = y_mars .^2;

sum     = x_sqr + y_sqr;
radius  = sqrt(sum);

theta_mars = zeros(5,1);
for i = 1:5
  theta_mars(i,1) = atand(y_mars(i,1)/x_mars(i,1));
end
