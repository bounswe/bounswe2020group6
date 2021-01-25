package com.example.akademise;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

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

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(context.getString(R.string.baseUrl))
                .addConverterFactory(GsonConverterFactory.create())
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

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            eventType = itemView.findViewById(R.id.event_type);
            eventTitle = itemView.findViewById(R.id.event_title);
            eventLocation = itemView.findViewById(R.id.event_location);
            eventInfo = itemView.findViewById(R.id.event_info);
            eventDate = itemView.findViewById(R.id.event_date);
            eventLink = itemView.findViewById(R.id.event_link);
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
