package com.example.akademise;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

import static android.content.Context.MODE_PRIVATE;

public class EventAdapter extends RecyclerView.Adapter<EventAdapter.ViewHolder>{
    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    public static final String MyIDPEREFERENCES = "MyIDPrefs";
    public static final String accessID = "XXXXXID";
    AkademiseApi akademiseApi;
    private String myToken;
    private  Integer myId;
    Context context;
    Event results;

    public EventAdapter(Context context, Event results){
        this.context = context;
        this.results = results;
        loadData();
        loadIDData();

        Gson gson = new GsonBuilder()
                .setLenient()
                .create();

        /*Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .client(client)
                .addConverterFactory(GsonConverterFactory.create(gson))
                .build();

         */


        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(context.getString(R.string.baseUrl))
                .addConverterFactory(GsonConverterFactory.create(gson))
                .build();

        akademiseApi = retrofit.create(AkademiseApi.class);
    }

    @NonNull
    @Override
    public EventAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(context);
        View view = inflater.inflate(R.layout.event_row, parent, false);
        return new EventAdapter.ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull EventAdapter.ViewHolder holder, int position) {

        holder.eventType.setText(results.result.get(position).type);
        holder.eventTitle.setText(results.result.get(position).title);
        holder.eventLocation.setText(results.result.get(position).location);
        holder.eventInfo.setText(results.result.get(position).other);
        holder.eventLink.setText(results.result.get(position).link);
        holder.eventDate.setText(results.result.get(position).date);
        holder.fav_count.setText(String.valueOf(results.result.get(position).event_favs.size()));


        if(results.result.get(position).isFavable){
            holder.fav_button.setText("Add to Favs");
        }
        else{
            holder.fav_button.setText("Remove from Favs");
        }

        holder.fav_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Id id= new Id(results.result.get(position).id);
                System.out.println(id.getId());
                if(results.result.get(position).isFavable){
                    Call<String> call = akademiseApi.favEvent(id,"Bearer " + myToken);
                    call.enqueue(new Callback<String>() {
                        @Override
                        public void onResponse(Call<String> call, Response<String> response) {
                            if(!response.isSuccessful()) {
                                System.out.println("NOT SUCCESSFUL");
                                return;
                            }
                            holder.fav_button.setText("Remove from Favs");
                            holder.fav_count.setText(String.valueOf(results.result.get(position).event_favs.size()+1));
                            ((Activity)context).finish();
                            context.startActivity( ((Activity)context).getIntent());
                        }

                        @Override
                        public void onFailure(Call<String> call, Throwable t) {
                            Toast.makeText(context, "Be sure to be connected", Toast.LENGTH_LONG).show();
                            System.out.println("FAILURE");
                            System.out.println(t.getMessage());
                        }
                    });
                }
                else{
                    Call<String> call = akademiseApi.unfavEvent(id,"Bearer " + myToken);
                    call.enqueue(new Callback<String>() {
                        @Override
                        public void onResponse(Call<String> call, Response<String> response) {
                            if(!response.isSuccessful()) {
                                System.out.println("NOT SUCCESSFUL");
                                return;
                            }
                            holder.fav_button.setText("Add to Favs");
                            holder.fav_count.setText(String.valueOf(results.result.get(position).event_favs.size()-1));
                            ((Activity)context).finish();
                            context.startActivity( ((Activity)context).getIntent());
                        }

                        @Override
                        public void onFailure(Call<String> call, Throwable t) {
                            Toast.makeText(context, "Be sure to be connected", Toast.LENGTH_LONG).show();
                            System.out.println("FAILURE");
                            System.out.println(t.getMessage());

                        }
                    });

                }
            }
        });

    }

    @Override
    public int getItemCount() {
        return results.result.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        TextView eventType;
        TextView eventTitle;
        TextView eventLocation;
        TextView eventInfo;
        TextView eventLink;
        TextView eventDate;
        TextView fav_count;
        Button fav_button;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            eventType = itemView.findViewById(R.id.event_type);
            eventTitle = itemView.findViewById(R.id.event_title);
            eventLocation = itemView.findViewById(R.id.event_location);
            eventInfo = itemView.findViewById(R.id.event_info);
            eventDate = itemView.findViewById(R.id.event_date);
            eventLink = itemView.findViewById(R.id.event_link);
            fav_count = itemView.findViewById(R.id.tv_fav_count_event);
            fav_button = itemView.findViewById(R.id.btn_favorite_event);
        }
    }

    private void loadData(){
        SharedPreferences sharedPreferences = context.getSharedPreferences(MyPEREFERENCES, MODE_PRIVATE);
        myToken = sharedPreferences.getString(accessToken, "");
    }
    private void loadIDData(){
        SharedPreferences sharedPreferences = context.getSharedPreferences(MyIDPEREFERENCES, MODE_PRIVATE);
        myId = sharedPreferences.getInt(accessID, 0);
    }
}
