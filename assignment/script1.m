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

radius2     = x_sqr + y_sqr;
radius  = sqrt(radius2);

% heliocentric angular location of mars
theta_mars = zeros(5,1);
for i = 1:5
  theta_mars(i,1) = atand(y_mars(i,1)/x_mars(i,1));
end

pos = zeros(5,2);
for i=1:size(pos, 1)
  pos(i,1) = x_sqr(i);
  pos(i,2) = y_sqr(i);
end
fid = fopen('script2.dat', 'w+');
for i=1:size(pos, 1)
    fprintf(fid, '%f ', pos(i,:));
    fprintf(fid, '\n');
end
fclose(fid);
% Determined least square fit for Y^2 = -X^2 + R^2 using the fit command
% in gnuplot
% Final set of parameters            Asymptotic Standard Error
% =======================            ==========================
%
% r               = 2.50216          +/- 0.1836       (7.338%)
% here r is the square of the mars-sun distance in AU

radius_sqr = 2.50216;
display('the radius of mars in a helio-centric circular orbit in the ecliptic plane')
radius_mars = sqrt(radius_sqr)
error       = sqrt(0.1836)

% the distance between mars and earth based on  --
% helio centric circular orbit located in the ecliptic --
% is 1.5818 +- 0.42849
