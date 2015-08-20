% This script plots the normalised count (histogram) and the PDF of a
% SINGLE COLUMN data X.

clear all; close all;

%*************************************************************
N = input('dataset size?');   %comment

no_of_bins = input('number of bins?');

X = rand(N,1); 

% if you wish  to use it for your data, comment  the three lines above
%(i.e., use  % before each of  the lines) uncomment the  three lines 
% below.   the function "load"  assumes that  the file  "filename.dat" 
%contains ONLY  NUMBERS, i.e.,  no alphabetical text  - it can  be more
% than 1 column. in this case,  we deal only with a single column.

%load filename.dat
%X = filename;
%N = length(X);

%*************************************************************

[Nx,x_posn] = hist(X,no_of_bins);

dx = x_posn(2) - x_posn(1); % computes the width of the bin.
			    % in fact, since "hist" by default uses equal bin
			    % size, the size of the bin is the
			    % difference between any two consecutive
			    % bins. it also is equal to range(x)/no_of_bins;

normalised_count = Nx ./sum(Nx);	% computes the normalised count.
pdf_X = normalised_count/dx;		% computes the PDF.


% check to see that area under the pdf is 1; i.e.,
% integral of pdf_X * dx = 1.

disp(['Area under the pdf of X = ',num2str(sum(pdf_X*dx))])

figure(1);

subplot(2,1,1); % splits the figure window into two and uses the top part.
bar(x_posn,normalised_count); % plots normalised histogram.

set(gca,'fontsize',12,'fontweight','bold');

% gca - get current axes. this sets the fontsize to 12 and the font
% type to bold. if you set these attributes before invoking xlabel or
% ylabel, they automatically set the size of the x and y labels to the
% chosen fontsize (12, in this case) and font type (bold, in this case)
% if not, you will have to explicity set the xlabel and ylabel size to
% the desired fontsize, type et c. see below for an example of how to
% change for each attribute of the axis

xlabel('X')
ylabel('Normalised count');
ht = title('Normalised count = frequency of occurrence/total number of samples');
set(ht,'fontsize',10,'fontweight','bold')

subplot(2,1,2); % bottom part of the figure window.
bar(x_posn, pdf_X); % plots the PDF.

set(gca,'fontsize',12,'fontweight','bold');

xlabel('X')
ylabel('f_X(x) [i.e., PDF of X]')

disp(['Mean of X = ',num2str(mean(X)), '; standard dev. of X = ', num2str(std(X))])
