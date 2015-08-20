x = load('phi_10000.dat');
Z = x(:,3);
xy = ones(130,130);

for i = 1:130
       for j = 1:130
        xy(i, j) = Z( (i-1)*130 + j );
       end   
end
            
contour(xy)