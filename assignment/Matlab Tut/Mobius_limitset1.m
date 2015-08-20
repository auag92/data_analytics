
clear all
close all

% z = x + y*i
% k = a + b*i
% f(z) = k*z

a = 0.9;
b = 0.4;

figure(1)
plot(0, 0,'-or','MarkerFaceColor',[1,0,0])
hold on


for i = 0:40
    for j = 0:40
        
        x0 = -200 + i*10;
        y0 = -200 + j*10;
        
        x = x0;
        y = y0;
        d0 = x^2 + y^2;
        count = 1;
        d = d0;
        
        while d > 0.0001
            
            xn = a*x - b*y;
            yn = b*x + a*y;
            
            count = count+1;
            
            x = xn;
            y = yn;
            
            d = (x)^2 + y^2;
            
        end
        
        rgbxy = [1-(count/2000) , count/800, 0];
        plot(x0,y0,'sw','MarkerFaceColor',rgbxy)
        hold on
        
        
    end
    
end