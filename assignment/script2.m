%-------------opposition data analysis -----------------------------------------
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
  pos(i,1) = c_phi(i)*c_theta(i);
  pos(i,2) = c_phi(i)*s_theta(i);
  pos(i,3) = s_phi(i);
end

fid = fopen('xyz.dat', 'w+');
for i=1:size(pos, 1)
    fprintf(fid, '%f ', pos(i,:));
    fprintf(fid, '\n');
end
fclose(fid);

% normal vector to the orbital plane of mars (a,b,1)
% Then: z = -a*x - b*y, where (x, y, z) are coordinates of mars in the helio centric frame
% and determined above in the pos matrix

% On fitting using an implementation of Marquardt-Levenberg algorithm (fit command)
% in gnuplot following values of parameters a and b were determined and were used to
% determine angle of declination --> delta of the martian orbital
% vis-a-vis the ecliptic

% Gnuplot results
% Final set of parameters            Asymptotic Standard Error
% =======================            ==========================
%
% a               = -0.0162388       +/- 0.002732     (16.82%)
% b               = 0.0534152        +/- 0.002655     (4.971%)

a               = 0.0162388;
b               = -0.0534152;
norm = (a^2+b^2+1);
display('the angle of declination of the martian orbit w.r.t the ecliptic');
delta = acosd(1/sqrt(norm))
