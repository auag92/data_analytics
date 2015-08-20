clear all;
close all;

N = input('size of data = ');
m = input('number of bins = ');

%part (0)
%define X, Y, Z
X = rand(N,1);
% Y := 2*pi*X;
% Z := sin(Y);

%part (a)
%theoritical distributions of - 
% Y ~ U(0, 2*pi)
% Z ~ 

%part (b)
%generate Y, Z
Y = 2*pi*X;
Z = sin(Y);

%part(c)
%to convert the data into a PDF we need to normalise the y-axis
figure(1);
[bX, aX] = hist(X,m); %gets bin values from numarically generated data, a is for x-axis, b is for y-axis
bXnorm = bX/N;        %normalising y-axis
dbX = (max(aX)-min(aX))/m;
bXpdf = bXnorm/dbX;    %forming the PDF
bar(aX,bXpdf,1);     %plotting the PDF

figure(2);
[bY,aY] = hist(Y,m);
bYnorm = bY/N;
dbY = (max(aY)-min(aY))/m;
bYpdf = bYnorm/dbY;
bar(aY,bYpdf,1);

figure(3);
[bZ,aZ] = hist(Z,m);
bZnorm = bZ/N;
dbZ = (max(aZ)-min(aZ))/m;
bZpdf = bZnorm/dbZ;    
bar(aZ,bZpdf,1);
  %Figures 1,2,3 are redundant as I have plotted them again in 4,5,6
  %comparing with theoritcal value.
  %They have been seperately plotted for the completeness of answer.


%part(d)
%plotting theoritical and numarical histograms for comparison

n = 1000;

figure(4);
aXt = linspace(0,1,n);
bXt = zeros(n,1)+1;
bar(aX,bXpdf,1)
hold on
plot(aXt,bXt);

figure(5);
aYt = linspace(0,2*pi,n);
bYt = zeros(n,1)+1/(2*pi);
bar(aY,bYpdf,1);
hold on
plot(aYt,bYt);

figure(6);
aZt = linspace(-0.999,0.999,n);    %range is taken only upto 0.999 as- 
bZt = 1./(pi*sqrt(1-(aZt).*(aZt)));    %- actual value at -1, 1 is infinity.
bar(aZ,bZpdf,1);                       %- and plotting that ruins the purpose of comparing the two graphs
hold on                                %- So it is done to keep the plot visually neat.
plot(aZt,bZt);

%part (e)
%compute E(Z) and Var(Z)
%E(Z) = 0
%Var(Z) = 0.5   after a tedious calculation!

%part (f)
%compute E(Z) and Var(Z) numarically

EZ = sum(Z)/N;
VarZ = sum(Z.*Z)/N;
disp(['E(Z) = ',num2str(EZ), '  theoritical value = ', num2str(0)]);
disp(['Var(Z) = ',num2str(VarZ), '  theoritical value = ', num2str(0.5)]);

%part (g)
%compute E(Z) and Var(Z) for different values of N

EZs = [0.0759213051333145;0.00444569410919566;0.00285502103279993;-0.00705246575092843;0.00184431323954180;-0.00202710374141520;-0.00448881245573598;-0.00950301448462845;-0.00113280036345310;0.00143629940571642;0.00180021531882210;0.00232057891015013;-0.00134457968671557;0.000618721835967021;0.000527051589272448;0.00343038914489572;0.000631383475394603;0.000509108385849091;-0.000878868255349818;0.000353163963162863];
VarZs =[0.541985054303555;0.496996048556209;0.498227846909621;0.498352607446197;0.498951903500054;0.499648020918334;0.500939326453369;0.498760372887636;0.498303319147755;0.499844719960763;0.499330039433132;0.497765548651766;0.500779448981252;0.500147721454301;0.500976615590889;0.501495032914629;0.502410357439749;0.499851339947444;0.499738585313478;0.500589615912802];
Ns = linspace(100,100000,20);

E =  zeros(20,1)*1;
Var =  zeros(20,1)+0.5;

figure(7)
plot(Ns, EZs)
hold on
plot(Ns, E);

figure(8)
plot(Ns, VarZs)
hold on
plot(Ns, Var);

%here I have manually added one of the sets I received from simulation
%so that you can see all the plots by running one single program