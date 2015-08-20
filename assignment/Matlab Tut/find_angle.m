stl = 50;
width = 2;
num = 10;
theta = [0,0,0,0,0,0,0,0,0,0];
dist = 0;

i0 = 475;
j0 = 400;
dire=0;

for run = 1:num
    i = i0;
    j = j0;
    if abw(i,j)== 1 && dire==0
        r = rand(1,1)*4 + 0.5;
        dire = round(r);
        for k = 1:stl
          if dire==1
                if abw(i-width,j+width)== 1
                    i = i-width/2; j = j+width/2;
                    dire = 1;
                    dist = dist+width/2;
                else dire = 2;
                end
            end
            if dire==2
                if abw(i-width,j-width)== 1
                    i = i-width/2; j = j-width/2;
                    dire = 2;
                    dist = dist+width/2;
                else dire = 3;
                end
            end
            if dire==3
                if abw(i+width,j-width)== 1
                    i = i+width/2; j = j-width/2;
                    dire = 3;
                    dist = dist+width/2;
                else dire = 4;
                end
            end
            if dire==4
                if abw(i+width,j+width)== 1
                    i = i+width/2; j = j+width/2;
                    dire = 4;
                    dist = dist+width/2;
                else dire = 0;
                end
            end
        end

    theta(run) = (j-j0)/(i-i0);
    i0 = i
    j0 = j
    dire=0;

    end

end


theta
dist
