import java.util.*;
import java.awt.*;
import java.util.Random;
public class TranszipAlg{
    public static void main(String[] args){
        Scanner console = new Scanner(System.in);
        System.out.println("Welcome to TransZip! ");
        System.out.print("How many buses are originally assigned to each station? ");
        int number = console.nextInt();
        System.out.println("What is your bus capacity? ");
        int size = console.nextInt();
        DrawingPanel panel = new DrawingPanel(2000,2300);
        Graphics g = panel.getGraphics();
        g.setColor(Color.BLACK);
        //grid
        //set maps
        double percentRed = 0.0;
        //generate number
        Random time = new Random();
        int[][] buses= new int[10][3];
        for(int i=0;i<10;i++){
          buses[i][0] = i+1;
          buses[i][1] = time.nextInt(20)+10;
        }
        double[][] stations = new double[10][5];
        stations[0][2] = 37.784908;
        stations[0][3] = -122.400186;
        stations[0][2] = 37.784109;
        stations[0][3] =  -122.399150;
        stations[0][2] = 37.782449;
        stations[0][3] = -122.397672;
        stations[0][2] = 37.782016;
        stations[0][3] = -122.396406;
        stations[0][2] = 37.779417;
        stations[0][3] = -122.393353;
        stations[0][2] = 37.780689;
        stations[0][3] = -122.390777;
        stations[0][2] = 37.781843;
        stations[0][3] = -122.391949;
        stations[0][2] = 37.784113;
        stations[0][3] = -122.395013;
        stations[0][2] = 37.786471;
        stations[0][3] = -122.397990;
        stations[0][2] = 37.787848;
        stations[0][3] = -122.400190;
        /*
        stations[i][0] = counter
        stations[i][1] = number of buses allocated to this specific route
        stations[i][2] = latitude of station
        stations[i][3] = longitude of station
        stations[i][4] = severity counter
        bus[i][0] = destination
        bus[i][1] = time to travel the route
        bus[i][2] = people on bus
        */
        /*
        3rd St & Howard St:
        3rd St & Folsom St:
        Harrison St & 3rd St:
        3rd St & Perry St: ,
        3rd St & Brannan St: ,
            2nd St & Townsend St: ,
        2nd St & Brannan St: ,
        2nd St & Harrison St: ,
        2nd St & Howard St: ,
        Mission St & 2nd St: ,
        */
        g.drawString("Welcome! This is a visual time lapse for the flow of bus station queues.", 300,10);
        for(int i=0;i<10;i++){
            String label = "Station "+Integer.toString(i);
            g.drawLine(70,90+100*i,1510,90+100*i); 
            g.drawString("Time (in minutes within a 24-hr period)",70,90+100*i+10); // x axis
            g.drawString(label, 10, 90+100*i);
            g.drawLine(70,20,70,90+100*i); // y axis
            stations[i][0]=0;
            stations[i][1] = number;
            stations[i][4] = 0;
        }
        //size is capacity
        ArrayList<Integer> boardlist = new ArrayList<Integer>();
        ArrayList<Integer> stationlist = new ArrayList<Integer>();
        Random board = new Random();
        Random st = new Random();
        //fixed routes
        // assume 2 buses per station
        for(int t=1;t<=24*60;t++){
          //t is increment
          int board1 = board.nextInt(8);
          boardlist.add(board1);
          int st1 = st.nextInt(10);
          stationlist.add(st1);
          stations[st1][0]+=board1;
          for(int u=0;u<10;u++){
            if(t%((buses[u][1]*2)/stations[u][1])==0){
              stations[u][0]-=size;
            }
            if(stations[u][0]<0){
              stations[u][0]=0;
            }
          }
          for(int s=0;s<10;s++){
              if(stations[s][0]>size){
                g.setColor(Color.RED);
                percentRed++;
                stations[s][4]++;
                g.drawLine(t+70,50+100*s,t+72,50+100*s);
              }else{
                if((stations[s][0]<=size)&&(stations[s][0]>2*(size/3))){
                  g.setColor(Color.ORANGE);
                  g.drawLine(t+70,50+100*s,t+72,50+100*s);
                }else{
                  g.setColor(Color.GREEN);
                  g.drawLine(t+70,50+100*s,t+72,50+100*s);
                }
              }
          }
        }
        for(int i=0;i<10;i++){
          stations[i][4] = stations[i][4]/(24*60);
        }
        g.setColor(Color.CYAN);
        g.drawString("These are what the time lapse graphs look like after implementing the algorithm.", 70, 1040);
        g.setColor(Color.BLACK);
        g.drawLine(0,1030, 1520, 1030);
        
       
        //with algorithm
        //reset values
        double opRed = 0;
        for(int i=0;i<10;i++){
            String label = "Station "+Integer.toString(i);
            g.drawString("Time (in minutes within a 24-hr period)",70,1110+100*i); // x axis
          g.drawLine(70,1100+100*i,1510,1100+100*i);
           g.drawString(label, 5, 1100+100*i);
          g.drawLine(70,800+100*i,70,1100+100*i);
          stations[i][0]=0;
          stations[i][1] = (double)number;
          stations[i][4] = 0;
        }
        System.out.println("The average percentage of red occurrences with fixed bus routes is "+(double)(percentRed/(10*24*60))*100+"%");
        System.out.println("This means that in general, citizens waste about "+percentRed +" minutes per day waiting for public transportation based on the current system");
          System.out.println();
          System.out.println("TransZip will reallocate buses instead of having a set number of 3 buses going to each station; it will revolutionize utilization.");
          System.out.println("The records of buses are printed in the following: ");
          ArrayList<Integer> free = new ArrayList<Integer>();
        for(int t=1;t<=24*60;t++){
          int board1 = boardlist.get(t-1);
          int st1 = stationlist.get(t-1);
          stations[st1][0]+=board1;
          for(int u=0;u<10;u++){
            if(t%((buses[u][1]*2)/stations[u][1])==0){
              stations[u][0]-=size;
            }
            if(stations[u][0]<0){
              stations[u][0]=0;
            }
          }
          for(int s=0;s<10;s++){
            if(stations[s][0]>size){
              g.setColor(Color.RED);
              opRed++;
              stations[s][4]++;
              g.drawLine(t+70,1050+100*s,t+72,1050+100*s);
            }else{
              if((stations[s][0]<=size)&&(stations[s][0]>2*(size/3))){
                g.setColor(Color.ORANGE);
                g.drawLine(t+70,1050+100*s,t+72,1050+100*s);
              }else{
                g.setColor(Color.GREEN);
                g.drawLine(t+70,1050+100*s,t+72,1050+100*s);
                if(stations[s][1]>1){
                  stations[s][1]--;
                  free.add(s);
                }
                //find the highest magnitude route and add a bus
                if(free.size()>0){
                  int index = 0;
                  double max = stations[0][4];
                  for(int f=1;f<10;f++){
                    if(stations[f][4] >max){
                      max=stations[f][4];
                      index = f;
                    }
                  }
                  stations[index][1]++;
                  free.remove(0);
                }
              }
            }
          }
        }
      
        System.out.println("The average percentage of red occurrences with dynamic bus routes is "+(double)(opRed/(10*24*60))*100+"%");
        System.out.println("In general, the algorithm was able to save passengers "+ ((double)(percentRed)- (double)(opRed)) +" minutes during commute time");
        }
}