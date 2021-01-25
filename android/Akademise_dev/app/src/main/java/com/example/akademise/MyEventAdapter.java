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

import org.w3c.dom.Text;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

import static android.content.Context.MODE_PRIVATE;

public class MyEventAdapter extends RecyclerView.Adapter<MyEventAdapter.ViewHolder>{
    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    public static final String MyIDPEREFERENCES = "MyIDPrefs";
    public static final String accessID = "XXXXXID";
    AkademiseApi akademiseApi;
    private String myToken;
    private  Integer myId;
    Context context;
    Event results;

    public MyEventAdapter(Context context, Event results){
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
    public MyEventAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(context);
        View view = inflater.inflate(R.layout.my_event_row, parent, false);
        return new MyEventAdapter.ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull MyEventAdapter.ViewHolder holder, int position) {

        holder.eventType.setText(results.result.get(position).type);
        holder.eventTitle.setText(results.result.get(position).title);
        holder.eventBody.setText(results.result.get(position).body);
        holder.eventLocation.setText(results.result.get(position).location);
        holder.eventInfo.setText(results.result.get(position).other);
        holder.eventLink.setText(results.result.get(position).link);
        holder.eventDate.setText(results.result.get(position).date);

        holder.eventDeleteButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int deletedEventId = results.result.get(position).id;
                EventOperation eventOperation = new EventOperation(deletedEventId);
                Call<EventOperation> deleteCall = akademiseApi.eventOperation(eventOperation,"Bearer " + myToken);
                deleteCall.enqueue(new Callback<EventOperation>() {
                    @Override
                    public void onResponse(Call<EventOperation> call, Response<EventOperation> response) {
                        if(!response.isSuccessful()){
                            System.out.println("NO SUCCESS");
                            return;
                        }
                    }
                    @Override
                    public void onFailure(Call<EventOperation> call, Throwable t) {
                    }
                });
            }
        });

        holder.eventUpdateButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int eventId = results.result.get(position).id;
                Intent intent = new Intent(context, UpdateEventActivity.class);
                intent.putExtra("eventId", eventId);
                context.startActivity(intent);
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
        TextView eventBody;
        TextView eventLocation;
        TextView eventInfo;
        TextView eventLink;
        TextView eventDate;
        Button eventUpdateButton;
        Button eventDeleteButton;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            eventType = itemView.findViewById(R.id.my_event_type);
            eventTitle = itemView.findViewById(R.id.my_event_title);
            eventBody = itemView.findViewById(R.id.my_event_body);
            eventLocation = itemView.findViewById(R.id.my_event_location);
            eventInfo = itemView.findViewById(R.id.my_event_info);
            eventDate = itemView.findViewById(R.id.my_event_date);
            eventLink = itemView.findViewById(R.id.my_event_link);
            eventUpdateButton = itemView.findViewById(R.id.my_event_update_button);
            eventDeleteButton = itemView.findViewById(R.id.my_event_delete_button);
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
