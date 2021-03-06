import java.util.*;
import java.awt.*;
import java.util.Random;
import java.io.*;

import com.fasterxml.jackson.databind.ObjectMapper;// in play 2.3




public class Station {
    static Random time = new Random();

    public double lat;
    public double lng;  
    public int mag;

    public Station(double lat, double lng) {
        this.lat = lat;
        this.lng = lng;
        this.mag = 0;
    }
}

public class Bus {
    public Station destinaton;
    public int time;
    public int people;

    public Bus(Station destinaton, int time, int people) {
        this.destinaton = destinaton;
        this.time = time;
        this.people = people;
    }
}

public class TransZip2{

    static class MyHandler implements HttpHandler {
        //server
        @Override
        public void handle(HttpExchange t) throws IOException {
            Station[] stations = new Station[10];
            stations[0] = new Station(37.784908, -122.400186);
            stations[1] = new Station(37.782449, -122.397672);
            stations[2] = new Station(37.782016, -122.396406);
            stations[3] = new Station(37.779417, -122.393353);
            stations[4] = new Station(37.780689, -122.390777);
            stations[5] = new Station(37.781843, -122.391949);
            stations[6] = new Station(37.784113, -122.395013);
            stations[7] = new Station(37.786471, -122.397990);
            stations[8] = new Station(37.787848, -122.400190);
            stations[9] = new Station(37.787648, -122.395197);

            for(int i=0; i < 10; i++) {
                stations[i].mag = stations[i].mag/(24*60);
            }

            Bus[] buses = new Bus[10];
            for(int i=0;i<10;i++){
                buses[i] = new Bus(station[i], time.nextInt(20)+10, 0);
            }

            ObjectMapper mapper = new ObjectMapper();
            mapper.enable(SerializationFeature.INDENT_OUTPUT);
    	    String arrayToJson = objectMapper.writeValueAsString(stations);
            
            String response = jsonInString;
            t.sendResponseHeaders(200, response.length());
            OutputStream os = t.getResponseBody();
            os.write(response.getBytes());
            os.close();
        }
    }

    public static void main(String[] args){
        //calling server stuff
        HttpServer server = HttpServer.create(new InetSocketAddress(8000), 0);
        server.createContext("/Transzip2", new MyHandler());
        server.setExecutor(null); // creates a default executor
        server.start();

        Scanner console = new Scanner(System.in);
        System.out.println("Welcome to TransZip! ");
        System.out.print("How many buses are originally assigned to each station? ");
        int number = console.nextInt();
        System.out.println("What is your bus capacity? ");
        int size = console.nextInt();

        DrawingPanel panel = new DrawingPanel(2000,2000);
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
            System.out.println(buses[i][1]);
            buses[i][2] = 0;
            //0 is free, 1 is occupied
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
        for(int i=0;i<10;i++){
            //  System.out.println("Graph for Station "+i);
            //  g.setColor(Color.GREEN);
            g.drawLine(70,90+100*i,1510,90+100*i);
            g.drawLine(70,20+100*i,70,90+100*i);
            //g.drawOval(i*50 +80,300, 15, 15);
            stations[i][0]=0;
            stations[i][1] = number;
            stations[i][4] = 0;


        }
        //30 is capacity
        ArrayList<Integer> boardlist = new ArrayList<Integer>();
        ArrayList<Integer> stationlist = new ArrayList<Integer>();

        Random board = new Random();
        Random st = new Random();
        //fixed routes
        // assume 2 buses per station
        for(int t=0;t<24*60;t++){
            //t is increment
            int board1 = board.nextInt(5);
            boardlist.add(board1);

            int st1 = st.nextInt(10);
            stationlist.add(st1);
            //  System.out.println("st1 " + st1+ " board1 "+ board1);
            stations[st1][0]+=board1;
            if(((t*2)/stations[st1][1])%buses[st1][1]==0){
                stations[st1][0]-=size;

            }
            if(stations[st1][0]<0){
                stations[st1][0]=0;
            }

            if(stations[st1][0]>size){
                g.setColor(Color.RED);
                percentRed++;
                stations[str1][4]++;
                g.drawLine(t+70,50+100*st1,t+72,50+100*st1);
            }else{
                if((stations[st1][0]<=size)&&(stations[st1][0]<2*(size/3))){
                    g.setColor(Color.ORANGE);
                    g.drawLine(t+70,50+100*st1,t+72,50+100*st1);

                }else{
                    g.setColor(Color.GREEN);
                    g.drawLine(t+70,50+100*st1,t+72,50+100*st1);
                }

            }
            for(int s=0;s<10;s++){
                if(s!=st1){
                    if(stations[s][0]>size){
                        g.setColor(Color.RED);
                        percentRed++;
                        stations[s][4]++;
                        g.drawLine(t+70,50+100*s,t+72,50+100*s);
                    }else{
                        if((stations[s][0]<=size)&&(stations[s][0]<20)){
                            g.setColor(Color.ORANGE);
                            g.drawLine(t+70,50+100*s,t+72,50+100*s);

                        }else{
                            g.setColor(Color.GREEN);
                            g.drawLine(t+70,50+100*s,t+72,50+100*s);
                        }

                    }
                }
            }
        }
        for(int i=0;i<10;i++){
            stations[i][4] = stations[i][4]/(24*60);
            System.out.println("The waiting(bad) magnitude for Route "+i+" is "+stations[i][4]);
        }
        g.setColor(Color.CYAN);
        g.drawLine(70,1020,1500,1020);
        g.setColor(Color.BLACK);



        //with algorithm
        //reset
        double opRed = 0;
        for(int i=0;i<10;i++){
            //  System.out.println("Graph for Station "+i);
            //  g.setColor(Color.GREEN);
            g.drawLine(70,1090+100*i,1510,1090+100*i);
            g.drawLine(70,1000+100*i,70,1200+100*i);
            //g.drawOval(i*50 +80,300, 15, 15);
            stations[i][0]=0;
            stations[i][1] = number;
            stations[i][4] = 0;

        }
        System.out.println("The percentage of red occurrences is "+(double)(percentRed/(10*24*60))*100);
        System.out.println("This algorithm reallocates buses instead of having a set number of 3 buses going to each station.");
        System.out.println("The records of buses are printed in the following: ");
        ArrayList<Integer> free = new ArrayList<Integer>();

        for(int t=0;t<24*60;t++){
            //t is increment
            int board1 = boardlist.get(t);
            int st1 = stationlist.get(t);

            //  System.out.println("st1 " + st1+ " board1 "+ board1);
            stations[st1][0]+=board1;
            if(((t*2)/stations[st1][1])%buses[st1][1]==0){
                stations[st1][0]-=size;

            }
            if(stations[st1][0]<0){
                stations[st1][0]=0;
            }

            if(stations[st1][0]>size){
                g.setColor(Color.RED);
                opRed++;
                stations[str1][4]++;
                g.drawLine(t+70,1050+100*st1,t+72,1050+100*st1);
                if(free.size()>0){
                    int busUsed = free.get(0);
                    System.out.println("A bus from Station "+busUsed + " has been moved to cover routes for Station "+st1);

                    stations[st1][1]++;
                    free.remove(0);
                }
            }else{
                if((stations[st1][0]<=size)&&(stations[st1][0]<2*(size/3))){
                    g.setColor(Color.ORANGE);
                    g.drawLine(t+70,1050+100*st1,t+72,1050+100*st1);

                }else{
                    g.setColor(Color.GREEN);
                    g.drawLine(t+70,1050+100*st1,t+72,1050+100*st1);
                    if(  stations[st1][1]>1){
                        stations[st1][1]--;
                        free.add(st1);
                    }

                }

            }
            for(int s=0;s<10;s++){
                if(s!=st1){
                    if(stations[s][0]>size){
                        opRed++;
                        g.setColor(Color.RED);
                        stations[s][4]++;
                        g.drawLine(t+70,1050+100*s,t+72,1050+100*s);
                        if(free.size()>0){
                            int busUsed = free.get(0);
                            System.out.println("A bus from Station "+busUsed + " has been moved to cover routes for Station "+s);
                            stations[s][1]++;
                            free.remove(0);
                        }
                    }else{
                        if((stations[s][0]<=size)&&(stations[s][0]<2*(size/3))){
                            g.setColor(Color.ORANGE);
                            g.drawLine(t+70,1050+100*s,t+72,1050+100*s);

                        }else{
                            g.setColor(Color.GREEN);
                            g.drawLine(t+70,1050+100*s,t+72,1050+100*s);
                            if(stations[st1][1]>1){
                                stations[st1][1]--;
                                free.add(st1);
                            }
                        }

                    }
                }
            }


        }

        System.out.println("The average percentage of red occurrences before algorithm is "+(double)(percentRed/(10*24*60))*100);
        System.out.println("The average percentage of red occurrences WITH ALGORITHM is "+(double)(opRed/(10*24*60))*100);

    }
}
