%------------- problem 3------------ -----------------------------------------
% Data from literature
% r_mars =  1.529; % radius of mars
% delta   = 1.85;  % declination of martian orbit w.r.t ecliptic

%-------------------------------------------------------------------------------
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
z_mars = zeros(5,1);
for i = 1:5
  indx      = 2*(i-1) + 1;
  x_mars(i,1) = (sin_theta(indx+1) - sin_theta(indx)) + (m(indx)*cos_theta(indx) - m(indx+1)*cos_theta(indx+1));
  x_mars(i,1) = x_mars(i)/(m(indx) - m(indx+1));

  y_mars(i,1)    = m(indx)*x_mars(i,1) + sin_theta(indx) - (m(indx)*cos_theta(indx));
end
%-------------------------------------------------------------------------------

a               = 0.0162388;
b               = -0.0534152;
for i = 1:5
  z_mars(i) = -a*x_mars(i) - b*y_mars(i);
end
% x_mars, y_mars and z_mars are the three dimensional cordinate of Mars in a heliocentric cartresian system

pos = zeros(5,3);
for i = 1:5
  pos(i,1) = x_mars(i)^2;
  pos(i,2) = y_mars(i)^2;
  pos(i,3) = z_mars(i)^2;
end

fid = fopen('script3.dat', 'w+');
for i=1:size(pos, 1)
    fprintf(fid, '%f ', pos(i,:));
    fprintf(fid, '\n');
end
fclose(fid);

% On fitting using an implementation of Marquardt-Levenberg algorithm (fit command)
% in gnuplot following values of parameters r which corresponds to the square of
% the radius were determined.
 % function used : g(x,y) = -x + -y + r

% Final set of parameters            Asymptotic Standard Error
% =======================            ==========================
%
% r               = 2.50484          +/- 0.1838       (7.337%)

% display("radius of martian orbit calculated assuming orbit is a circle");
radius_sqr = 2.50484;
radius = sqrt(radius_sqr)
error  = sqrt(0.1838)

%%----------------------------------------------------------------------------%%
data_opp = importdata('01_data_mars_opposition.csv',',',1);
len = 12;

theta       = zeros(len,1);
geo_phi     = zeros(len,1);
phi         = zeros(len,1);

for i = 1:len
  geo_phi(i)   = data_opp.data(i,8) + (data_opp.data(i,9)/60);
end

r_mars = 1.5818;

for i = 1:len
  phi(i) = geo_phi(i)/r_mars;
end

zdc  = zeros(len,1);
angl = zeros(len,1);
for i = 1:len
  zdc(i,1)    = data_opp.data(i,4);
  angl(i,1)   = data_opp.data(i,5) + data_opp.data(i,6)/60;
  theta(i,1)  = (zdc(i)-1)*30 + angl(i);
end

s_theta = sind(theta);
c_theta = cosd(theta);
s_phi   = sind(phi);
c_phi   = cosd(phi);

pos = zeros(len,3);
for i = 1:len
  pos(i,1) = radius*c_phi(i)*c_theta(i);
  pos(i,2) = radius*c_phi(i)*s_theta(i);
  pos(i,3) = radius*s_phi(i);
end

a               = 0.0162388;
b               = -0.0534152;

% ## Copyright (C) 2008 Indrek Mandre <indrek(at)mare.ee>
% ## For more information please see http://www.mare.ee/indrek/octave/
%
% ## Compute:
% ##    circle 3D coordinates
% ##
% ## usage: [X, Y, Z] = circle3d(center, normal, radius)
% ##
% ## Example:
% ##    [X, Y, Z] = circle3d([0 0 0], [1 0 0], 1);
% ##
%
% ## Author: Indrek Mandre <indrek(at)mare.ee>
% ## Created: 2008-07-17

function [x, y, z] = circle3d(center, normal, radius)
  p = cross(normal, [1 0 0]);
  if (dot(p, p) < 0.3 )
    p = cross(normal, [0 1 0]);
    if (dot(p, p) < 0.3 )
      p = cross(normal, [0 0 1]);
    endif
  endif
  p = p ./ norm(p);
  q = cross (normal, p);
  t = (0:pi/16:2*pi)(:);
  ret = repmat(center, size(t)) + radius * cos(t) * p + radius * sin(t) * q;
  x = ret(:, 1);
  y = ret(:, 2);
  z = ret(:, 3);
endfunction


[X,Y,Z] = circle3d([0 0 0], [a b 1], radius);

hold on
plot3(X,Y,Z);
plot3 (pos(1,:), pos(2,:), pos(3,:),'red','*');
hold off
