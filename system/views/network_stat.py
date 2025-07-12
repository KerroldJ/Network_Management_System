from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from speedtest import Speedtest
from datetime import datetime

@csrf_exempt
def get_realtime_network_stats(request):
    try:
        # Speedtest
        st = Speedtest()
        st.get_best_server()  # Selects a server and measures latency
        avg_ping = st.results.ping  # Latency in ms
        download_speed = round(st.download() / 1_000_000, 2)  # Mbps
        upload_speed = round(st.upload() / 1_000_000, 2)      # Mbps

        return JsonResponse({
            "download_speed": download_speed,
            "upload_speed": upload_speed,
            "ping": round(avg_ping, 2),
            "timestamp": datetime.now().isoformat()
        })

    except Exception as e:
        print("Error in get_realtime_network_stats:", e)
        return JsonResponse({"error": str(e)}, status=500)