

% part 0 : Generate 500 numbers from exponential distributoin with 
%          parameter lamda = 0.5     

mu = 2;
x = random('exp',mu,1,500);  % The parameter here is mean, not lamda. mu = 1/lamda.

xbar = sum(x) / 500 ;

% part b :
% 1} Group the data into 10 equal length intervals.
% 2} Do the goodness of fit test.

xmax = 10;
xl = linspace(0,xmax,11); % 11 linear points to make 10 bins.
                          % xl stands for linear points in value of x
                          % last bin is extended till infinity.
                          % xamx value can be changed so that the thumb
                          % rule of at least 3/5 in each bin is satisfied.
         % can check that for xmax = 5, it is accepted at 10%
         % and at xmax = 10, it is rejected at 10%
                          
                          
 % F(x) = 1 - exp(-lamda*x)
 % to get expected count in the ith bin, we do following
 % p(ith bin) = F(x(i+1)) - F(x(i))

 pn = zeros(1,10);    % array to store expected probabilities.
 
 for i=1:9
     pn(i) = exp(-xl(i)/2) -  exp(-xl(i+1)/2) ;
 end
 pn(10) = 1 - sum(pn);
 
xs = sort(x);        % sortes array of numbers that were generated.
xn = zeros(1,10);    % array to store observed number of x's in each bin

j = 1;

for i=1:9         % counting the number of occurances in each bin
    
    count = 0;
    
    while xs(j) < xl(i+1) && i<10
        j = j+1;
        count = count + 1;
    end

xn(i) = count;

end
xn(10) = 500 - sum(xn);   % last bin takes the remaining.

tsn = zeros(1,10);   % array ro store test statistic values.

for i = 1:10         % test statistic value for each bin,].
    
    tsn(i) = (( xn(i) - 500*pn(i) )^2)/(500*pn(i));

end
                        
ts = sum(tsn);     % test statistic

a1 = 14.7;      % value of chi^2 with 9 degrees of freedon at 10% significance level
a2 = 21.7;      % value of chi^2 with 9 degrees of freedon at 1% significance level


if ts < a1
   disp('accepted at 10% significance level');
   disp('accepted at 1% significance level');
end

if ts > a1 && ts < a2
   disp('rejected at 10% significance level');
   disp('accepted at 1% significance level');
end

if ts > a2
   disp('rejected at 10% significance level');
   disp('rejected at 1% significance level');
end
